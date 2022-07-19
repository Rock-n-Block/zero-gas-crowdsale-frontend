import BigNumber from 'bignumber.js';
import { all, call, put, select, takeLatest } from 'typed-redux-saga';

import { ADMIN_ROLE, ZEROGAS_DECIMALS } from '@/config/constants';
import apiActions from '@/store/api/actions';
import tokenActionTypes from '@/store/tokens/actionTypes';
import { getTokensSaga } from '@/store/tokens/sagas/getTokens';
import userActionTypes from '@/store/user/actionTypes';
import { getTokenBalancesSaga } from '@/store/user/sagas/getTokenBalances';
import userSelector from '@/store/user/selectors';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';

import { getCrowdsaleInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateCrowdSaleState } from '../reducer';
import { getCrowdsaleContract } from '../utils';

import { getCrowdsaleBalancesSaga } from './getCrowdsaleBalances';

export function* getCrowdsaleInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getCrowdsaleInfo>) {
  yield* put(apiActions.request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    const {
      isAdmin,
      hardcap,
      totalBought,
      userBought,
      totalClaimed,
      stageTimestamps,
      price,
      softcap,
      allowance,
    } = yield* all({
      isAdmin: call(crowdsaleContract.methods.hasRole(ADMIN_ROLE, userAddress).call),
      hardcap: call(crowdsaleContract.methods.hardcap().call),
      totalBought: call(crowdsaleContract.methods.totalBought().call),
      userBought: call(crowdsaleContract.methods.userToBalance(userAddress, 3).call),
      totalClaimed: call(crowdsaleContract.methods.totalClaimed().call),
      stageTimestamps: call(crowdsaleContract.methods.getTimestamps().call),
      price: call(crowdsaleContract.methods.getPrice().call),
      softcap: call(crowdsaleContract.methods.softcap().call),
      allowance: call(crowdsaleContract.methods.getAllowable(userAddress).call),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _: call(getTokensSaga, {
        type: tokenActionTypes.GET_TOKENS,
        payload: { web3Provider },
      }),
    });

    yield* call(getCrowdsaleBalancesSaga, {
      type: actionTypes.GET_CROWDSALE_BALANCES,
      payload: { web3Provider },
    });

    yield* call(getTokenBalancesSaga, {
      type: userActionTypes.GET_TOKEN_BALANCES,
      payload: { web3Provider },
    });

    yield* put(
      updateCrowdSaleState({
        isAdmin,
        hardcap: getNaturalTokenAmount(parseInt(hardcap, 10), ZEROGAS_DECIMALS),
        totalBought: getNaturalTokenAmount(parseInt(totalBought, 10), ZEROGAS_DECIMALS),
        userBought: getNaturalTokenAmount(+userBought, ZEROGAS_DECIMALS),
        totalClaimed: getNaturalTokenAmount(+totalClaimed, ZEROGAS_DECIMALS),
        stage1StartDate: stageTimestamps ? +stageTimestamps[0][0] : 0,
        stage1EndDate: stageTimestamps ? +stageTimestamps[0][1] : 0,
        stage2StartDate: stageTimestamps ? +stageTimestamps[1][0] : 0,
        stage2EndDate: stageTimestamps ? +stageTimestamps[1][1] : 0,
        zeroGasPrice: new BigNumber(+price.price).dividedBy(+price.denominator).toNumber(),
        softcap: getNaturalTokenAmount(+softcap, ZEROGAS_DECIMALS),
        minPurchase: getNaturalTokenAmount(+allowance[0], ZEROGAS_DECIMALS),
        maxPurchase: getNaturalTokenAmount(+allowance[1], ZEROGAS_DECIMALS),
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CROWDSALE_INFO, getCrowdsaleInfoSaga);
}
