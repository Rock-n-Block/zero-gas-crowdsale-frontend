import { all, put, takeLatest, call } from 'typed-redux-saga';

import apiActions from '@/store/api/actions';
import { getCrowdsaleContract } from '../utils';
import { getCrowdsaleInfo } from '../actions';
import actionTypes from '../actionTypes';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';
import { TOKEN_DECIMALS } from '@/appConstants';
import { updateCrowdSaleState } from '../reducer';

type CrowdsaleInfo = {
  hardcap: string;
  totalBuyed: string;
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
    const { hardcap, totalBuyed }: CrowdsaleInfo = yield* all({
      hardcap: call(crowdsaleContract.methods.hardcap().call),
      totalBuyed: call(crowdsaleContract.methods.totalBuyed().call),
    });

    yield* put(
      updateCrowdSaleState({
        hardcap: getNaturalTokenAmount(parseInt(hardcap, 10), TOKEN_DECIMALS),
        totalBuyed: getNaturalTokenAmount(parseInt(totalBuyed, 10), TOKEN_DECIMALS),
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
