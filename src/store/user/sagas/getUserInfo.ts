import { call, put, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';

import { getUserInfo } from '../actions';
import actionTypes from '../actionTypes';

export function* getUserInfoSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getUserInfo>) {
  yield put(request(type));

  try {
    // TODO

    yield put(success(type));
  } catch (err) {
    console.error(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_USER_INFO, getUserInfoSaga);
}
