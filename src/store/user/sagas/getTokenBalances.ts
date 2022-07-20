import { all, call, put, select, takeLatest } from 'typed-redux-saga';

import { error, request, success } from '@/store/api/actions';
import tokenSelectors from '@/store/tokens/selectors';

import { getTokenBalances } from '../actions';
import actionTypes from '../actionTypes';

import { getTokenBalanceSaga } from './getTokenBalance';
import { safe } from '@/store/utils';

// Fetch balances for all available token/contracts/assets
export function* getTokenBalancesSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getTokenBalances>) {
  yield* put(request(type));

  const { tokens } = yield* select(tokenSelectors.getTokens);
  try {
    yield* all(
      Object.values(tokens).map((token) =>
        call(getTokenBalanceSaga, {
          type: actionTypes.GET_TOKEN_BALANCE,
          payload: { web3Provider, tokenAddress: token.address },
        }),
      ),
    );

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_TOKEN_BALANCES, safe(getTokenBalancesSaga));
}
