import { all, call, put, takeLatest } from 'typed-redux-saga';

import { ETHER_ADDRESS, ETHER_DECIMALS } from '@/config/constants';
import apiActions from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import { getTokenContract } from '@/store/user/utils';

import { getTokens } from '../actions';
import actionTypes from '../actionTypes';
import { updateTokensState } from '../reducer';

export function* getTokensSaga({ type, payload: { web3Provider } }: ReturnType<typeof getTokens>) {
  yield* put(apiActions.request(type));

  try {
    const { data } = yield* call(baseApi.getTokens);

    const decimals: any[] = yield* all(
      data.map((token: any) => {
        const tokenContract = getTokenContract(web3Provider, token.address);
        if (token.address === ETHER_ADDRESS) {
          return ETHER_DECIMALS;
        }
        return call(tokenContract.methods.decimals().call);
      }),
    );

    const tokens = Object.fromEntries(
      data.map((token: any, i) => {
        return [
          token.address,
          {
            ...token,
            fullName: token.full_name,
            decimals: +decimals[i],
          },
        ];
      }),
    );

    yield put(
      updateTokensState({
        tokens,
      }),
    );

    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKENS, getTokensSaga);
}
