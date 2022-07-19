import { call, put, select, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';
import userSelector from '@/store/user/selectors';

import { claimRised, getCrowdsaleBalances } from '../actions';
import actionTypes from '../actionTypes';
import { getCrowdsaleContract } from '../utils';

export function* claimRisedSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof claimRised>) {
  yield* put(request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    yield* call(crowdsaleContract.methods.claimRised().send, { from: userAddress });

    yield* put(getCrowdsaleBalances({ web3Provider }));

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.CLAIM_RISED, claimRisedSaga);
}
