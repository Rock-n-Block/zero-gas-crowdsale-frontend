import { call, put, select, takeLatest } from 'typed-redux-saga';

import { contractsConfig, ContractsNames } from '@/config';
import { isMainnet } from '@/config/constants';
import apiActions from '@/store/api/actions';

import { approve } from '../actions';
import actionTypes from '../actionTypes';
import userSelector from '../selectors';
import { getTokenContract } from '../utils';
import { safe } from '@/store/utils';

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
    yield* call(tokenContract.methods.approve(crowdsaleAddress, amount).send, {
      from: userAddress,
    });
    yield* put(apiActions.success(type));
  } catch (err) {
    console.error(err);
    yield* put(apiActions.error(type));
    throw err;
  }
}

export default function* listener() {
  yield takeLatest(actionTypes.APPROVE, safe(approveSaga));
}
