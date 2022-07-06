import { all, call, put, takeLatest } from 'typed-redux-saga';

import apiActions from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import tokenActionTypes from '@/store/user/actionTypes';
import { getTokenBalanceSaga } from '@/store/user/sagas/getTokenBalance';

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

    // Fetch balances for all tokens
    yield* all(
      data.map((token: any) =>
        call(getTokenBalanceSaga, {
          type: tokenActionTypes.GET_TOKEN_BALANCE,
          payload: { web3Provider, tokenAddress: token.address },
        }),
      ),
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
