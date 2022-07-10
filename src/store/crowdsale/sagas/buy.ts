import { call, put, select, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import { setActiveModal } from '@/store/modals/reducer';
import userSelector from '@/store/user/selectors';

import { buy } from '../actions';
import actionTypes from '../actionTypes';

export function* buySaga({
  type,
  payload: { web3Provider, amount, tokenAddress },
}: ReturnType<typeof buy>) {
  yield* put(request(type));

  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    const { data } = yield* call(baseApi.buy, {
      amount_to_receive: amount,
      token_address: tokenAddress,
    });

    const { transactionHash } = yield* call(web3Provider.eth.sendTransaction, {
      ...data.initial_tx,
      from: userAddress,
    });

    yield* put(setActiveModal({ txHash: transactionHash }));

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.BUY, buySaga);
}
