import { call, put, select, takeLatest } from 'typed-redux-saga';

import { ETHER_ADDRESS, ETHER_DECIMALS } from '@/config/constants';
import { error, request, success } from '@/store/api/actions';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateTokensState } from '../reducer';
import userSelector from '../selectors';
import { getTokenContract } from '../utils';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider, tokenAddress },
}: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));

  const { address: userAddress } = yield* select(userSelector.getUser);
  const tokenContract = getTokenContract(web3Provider, tokenAddress);

  try {
    let balance;
    let decimals;
    if (tokenAddress === ETHER_ADDRESS) {
      balance = yield* call(() => web3Provider.eth.getBalance(userAddress));
      decimals = ETHER_DECIMALS;
    } else {
      balance = yield* call(tokenContract.methods.balanceOf(userAddress).call);
      decimals = yield* call(tokenContract.methods.decimals().call);
    }
    yield* put(updateTokensState({ [tokenAddress]: getNaturalTokenAmount(+balance, +decimals) }));

    yield put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
