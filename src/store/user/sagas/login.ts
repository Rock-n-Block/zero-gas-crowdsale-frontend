import { call, put, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import { GetMetamaskMessageResponse, MetamaskLoginResponse } from '@/types/api';
import { notify } from '@/utils';

import { login } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* loginSaga({ type, payload: { web3Provider, address } }: ReturnType<typeof login>) {
  yield put(request(type));

  try {
    const { data: message }: GetMetamaskMessageResponse = yield call(baseApi.getMetamaskMessage);
    const signedMessage = yield* call(() => web3Provider.eth.personal.sign(message, address, ''));

    const {
      data: { key },
    }: MetamaskLoginResponse = yield call(baseApi.metamaskLogin, {
      address,
      msg: message,
      signed_msg: signedMessage,
    });
    yield put(
      updateUserState({
        key,
      }),
    );

    notify.success(`Wallet connected: ${address.slice(0, 5)}...${address.slice(-5)}`);

    yield put(success(type));
  } catch (err) {
    console.error(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.LOGIN, loginSaga);
}
