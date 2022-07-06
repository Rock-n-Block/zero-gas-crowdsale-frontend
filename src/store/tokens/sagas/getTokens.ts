import { call, put, takeLatest } from 'typed-redux-saga';
import apiActions from '@/store/api/actions';

import { baseApi } from '@/store/api/apiRequestBuilder';
import { getTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateTokensState } from '../reducer';

export function* getTokensSaga({ type, payload }: ReturnType<typeof getTokens>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield* call(baseApi.getTokens);
    yield put(updateTokensState({ tokens: data }));

    yield* put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKENS, getTokensSaga);
}
