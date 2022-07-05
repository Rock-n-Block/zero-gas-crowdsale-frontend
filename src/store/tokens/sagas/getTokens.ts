import { all, call, put, takeLatest } from 'typed-redux-saga';

import apiActions from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import tokenActionTypes from '@/store/user/actionTypes';
import { getTokenBalanceSaga } from '@/store/user/sagas/getTokenBalance';
import { Token } from '@/types';

import { getTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateTokensState } from '../reducer';

export function* getTokensSaga({ type, payload: { web3Provider } }: ReturnType<typeof getTokens>) {
  yield* put(apiActions.request(type));

  try {
    const { data }: { data: Token[] } = yield* call(baseApi.getTokens);
    yield put(
      updateTokensState({
        tokens: Object.fromEntries(data.map((token) => [token.address, token])),
      }),
    );

    // Fetch balances for all tokens
    yield* all(
      data.map((token) =>
        call(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          getTokenBalanceSaga,
          {
            type: tokenActionTypes.GET_TOKEN_BALANCE,
            payload: { web3Provider, tokenAddress: token.address },
          },
        ),
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
