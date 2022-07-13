import BigNumber from 'bignumber.js';
import { all, call, put, select, takeLatest } from 'typed-redux-saga';

import { ETHER_DECIMALS } from '@/config/constants';
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

export function* getCrowdsaleInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getCrowdsaleInfo>) {
  yield* put(apiActions.request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    const { hardcap, totalBought, userBought, stageTimestamps, price, softcap, allowance } =
      yield* all({
        hardcap: call(crowdsaleContract.methods.hardcap().call),
        totalBought: call(crowdsaleContract.methods.totalBought().call),
        userBought: call(crowdsaleContract.methods.userToBalance(userAddress, 3).call),
        stageTimestamps: call(crowdsaleContract.methods.getTimestamps().call),
        price: call(crowdsaleContract.methods.getPrice().call),
        softcap: call(crowdsaleContract.methods.softcap().call),
        allowance: call(crowdsaleContract.methods.getAllowable(userAddress).call),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tokens: call(getTokensSaga, {
          type: tokenActionTypes.GET_TOKENS,
          payload: { web3Provider },
        }),
      });

    yield* call(getTokenBalancesSaga, {
      type: userActionTypes.GET_TOKEN_BALANCES,
      payload: { web3Provider },
    });

    yield* put(
      updateCrowdSaleState({
        hardcap: getNaturalTokenAmount(parseInt(hardcap, 10), ETHER_DECIMALS),
        totalBought: getNaturalTokenAmount(parseInt(totalBought, 10), ETHER_DECIMALS),
        userBought: getNaturalTokenAmount(+userBought, ETHER_DECIMALS),
        stage1StartDate: stageTimestamps ? +stageTimestamps[0][0] : 0,
        stage1EndDate: stageTimestamps ? +stageTimestamps[0][1] : 0,
        stage2StartDate: stageTimestamps ? +stageTimestamps[1][0] : 0,
        stage2EndDate: stageTimestamps ? +stageTimestamps[1][1] : 0,
        zeroGasPrice: new BigNumber(+price.price).dividedBy(+price.denominator).toNumber(),
        softcap: getNaturalTokenAmount(+softcap, ETHER_DECIMALS),
        minPurchase: getNaturalTokenAmount(+allowance[0], ETHER_DECIMALS),
        maxPurchase: getNaturalTokenAmount(+allowance[1], ETHER_DECIMALS),
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CROWDSALE_INFO, getCrowdsaleInfoSaga);
}
