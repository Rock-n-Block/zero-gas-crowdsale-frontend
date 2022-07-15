import { call, put, select, takeLatest } from 'typed-redux-saga';

import { contractsConfig, ContractsNames } from '@/config';
import { isMainnet } from '@/config/constants';
import apiActions from '@/store/api/actions';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';
import { getTokenContract } from '../utils';

export function* approveSaga({
  type,
  payload: { web3Provider, tokenAddress, amount },
}: ReturnType<typeof approve>) {
  yield* put(apiActions.request(type));

  const { address: userAddress } = yield* select(userSelector.getUser);
  const { address: crowdsaleAddress } =
    contractsConfig.contracts[ContractsNames.crowdsale][isMainnet ? 'mainnet' : 'testnet'];
  const tokenContract = getTokenContract(web3Provider, tokenAddress);

  try {
    yield* call(tokenContract.methods.approve(crowdsaleAddress, parseInt(amount, 10)).send, {
      from: userAddress,
    });
    yield* put(apiActions.success(type));
  } catch (err) {
    yield* put(apiActions.error(type));
    console.error(err);
    throw new Error('User rejected transaction');
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, approveSaga);
}
