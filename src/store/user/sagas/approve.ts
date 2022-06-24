import { call, put, select, takeLatest } from 'typed-redux-saga';

import { ContractsNames } from '@/config';
import apiActions from '@/store/api/actions';
import { Erc20Abi } from '@/types';
import { toDecimals } from '@/utils';
import { getContractDataByHisName } from '@/utils/getContractDataByHisName';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';

export function* approveSaga({
  type,
  payload: { web3Provider, spenderAddress, amount, contract },
}: ReturnType<typeof approve>) {
  yield put(apiActions.request(type));
  const myAddress = yield* select(userSelector.getProp('address'));

  const [tokenAbi, tokenAddress] = getContractDataByHisName(ContractsNames[contract]);

  const amountWithDecimals = toDecimals(amount);

  try {
    const tokenContract: Erc20Abi = yield new web3Provider.eth.Contract(tokenAbi, tokenAddress);
    yield call(tokenContract.methods.approve(spenderAddress, amountWithDecimals).send, {
      from: myAddress,
    });
    yield put(apiActions.success(type));
  } catch (err) {
    console.log(err);
    throw new Error('User rejected transaction');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
