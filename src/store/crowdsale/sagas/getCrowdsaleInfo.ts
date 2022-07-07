import BigNumber from 'bignumber.js';
import { all, call, put, takeLatest } from 'typed-redux-saga';

import { ETHER_DECIMALS } from '@/config/constants';
import apiActions from '@/store/api/actions';
import tokenActionTypes from '@/store/tokens/actionTypes';
import { getTokensSaga } from '@/store/tokens/sagas/getTokens';
import userActionTypes from '@/store/user/actionTypes';
import { getTokenBalancesSaga } from '@/store/user/sagas/getTokenBalances';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';

import { getCrowdsaleInfo } from '../actions';
import actionTypes from '../actionTypes';
import { updateCrowdSaleState } from '../reducer';
import { getCrowdsaleContract } from '../utils';

type CrowdsaleInfo = {
  hardcap: string;
  totalBought: string;
};

export function* getCrowdsaleInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getCrowdsaleInfo>) {
  yield* put(apiActions.request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { hardcap, totalBought, stage, stageTimestamps, price }: CrowdsaleInfo = yield* all({
      hardcap: call(crowdsaleContract.methods.hardcap().call),
      totalBought: call(crowdsaleContract.methods.totalBought().call),
      stage: call(crowdsaleContract.methods.getStage().call),
      stageTimestamps: call(crowdsaleContract.methods.getTimestamps().call),
      price: call(crowdsaleContract.methods.getPrice().call),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tokens: call(getTokensSaga, { type: tokenActionTypes.GET_TOKENS, payload: { web3Provider } }),
    });

    yield* call(getTokenBalancesSaga, {
      type: userActionTypes.GET_TOKEN_BALANCES,
      payload: { web3Provider },
    });

    yield* put(
      updateCrowdSaleState({
        hardcap: getNaturalTokenAmount(parseInt(hardcap, 10), ETHER_DECIMALS),
        totalBought: getNaturalTokenAmount(parseInt(totalBought, 10), ETHER_DECIMALS),
        currentStage: +stage,
        stage1StartDate: stageTimestamps ? new Date(+stageTimestamps[0][0]) : undefined,
        stage1EndDate: stageTimestamps ? new Date(+stageTimestamps[0][1]) : undefined,
        stage2StartDate: stageTimestamps ? new Date(+stageTimestamps[1][0]) : undefined,
        stage2EndDate: stageTimestamps ? new Date(+stageTimestamps[1][1]) : undefined,
        zeroGasPrice: new BigNumber(+price.price).dividedBy(+price.denominator).toNumber(),
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
