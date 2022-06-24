import { call, put, takeLatest } from 'typed-redux-saga';

import { ContractsNames } from '@/config';
import { error, request, success } from '@/store/api/actions';
import { Erc20Abi } from '@/types/contracts';
import { fromDecimals } from '@/utils';
import { getContractDataByHisName } from '@/utils/getContractDataByHisName';

import { getTokenBalance } from '../actions';
import actionTypes from '../actionTypes';
import { updateUserState } from '../reducer';

export function* getTokenBalanceSaga({
  type,
  payload: { web3Provider, address },
}: ReturnType<typeof getTokenBalance>) {
  yield put(request(type));
  const [tokenAbi, tokenAddress] = getContractDataByHisName(ContractsNames.token);

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenAddress);
    if (address) {
      const balance = yield* call(tokenContract.methods.balanceOf(address).call);
      const decimals = yield* call(tokenContract.methods.decimals().call);

      yield put(updateUserState({ tokenBalance: fromDecimals(balance, +decimals) }));
    }

    yield put(success(type));
  } catch (err) {
    console.log(err);
    yield put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.GET_TOKEN_BALANCE, getTokenBalanceSaga);
}
