import { all, call, put, takeLatest } from 'typed-redux-saga';

import apiActions from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';

import { getTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateTokensState } from '../reducer';

export function* getTokensSaga({ type, payload: { web3Provider } }: ReturnType<typeof getTokens>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield* call(baseApi.getTokens);

    yield put(
      updateTokensState({
        tokens: Object.fromEntries(
          data.map((token: any) => [
            token.address,
            {
              ...token,
              fullName: token.full_name,
            },
          ]),
        ),
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKENS, getTokensSaga);
}
