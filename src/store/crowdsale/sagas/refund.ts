import { call, put, select, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';
import userSelector from '@/store/user/selectors';

import { refund } from '../actions';
import actionTypes from '../actionTypes';
import { updateCrowdSaleState } from '../reducer';
import { getCrowdsaleContract } from '../utils';

export function* refundSaga({ type, payload: { web3Provider } }: ReturnType<typeof refund>) {
  yield* put(request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    yield* call(crowdsaleContract.methods.refund().send, { from: userAddress });
    yield* put(updateCrowdSaleState({ userBought: 0 }));

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.REFUND, refundSaga);
}
