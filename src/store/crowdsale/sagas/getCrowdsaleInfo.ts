import { all, put, takeLatest, call } from 'typed-redux-saga';

import apiActions from '@/store/api/actions';
import { getCrowdsaleContract } from '../utils';
import { getCrowdsaleInfo } from '../actions';
import actionTypes from '../actionTypes';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';
import { TOKEN_DECIMALS } from '@/appConstants';
import { getTokensSaga } from '@/store/tokens/sagas/getTokens';
import tokenActionTypes from '@/store/tokens/actionTypes';
import { updateCrowdSaleState } from '../reducer';

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
      tokens: call(getTokensSaga, { type: tokenActionTypes.GET_TOKENS }),
    });

    yield* put(
      updateCrowdSaleState({
        hardcap: getNaturalTokenAmount(parseInt(hardcap, 10), TOKEN_DECIMALS),
        totalBought: getNaturalTokenAmount(parseInt(totalBought, 10), TOKEN_DECIMALS),
        currentStage: +stage,
        stage1StartDate: stageTimestamps ? new Date(+stageTimestamps[0][0]) : undefined,
        stage1EndDate: stageTimestamps ? new Date(+stageTimestamps[0][1]) : undefined,
        stage2StartDate: stageTimestamps ? new Date(+stageTimestamps[1][0]) : undefined,
        stage2EndDate: stageTimestamps ? new Date(+stageTimestamps[1][1]) : undefined,
        zeroGasPrice: +price.price / +price.denominator,
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_CROWDSALE_INFO, getCrowdsaleInfoSaga);
}
