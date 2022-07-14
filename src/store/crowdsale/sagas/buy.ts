import { call, put, select, takeLatest } from 'typed-redux-saga';

import { ETHER_ADDRESS } from '@/config/constants';
import { error, request, success } from '@/store/api/actions';
import { baseApi } from '@/store/api/apiRequestBuilder';
import { setActiveModal } from '@/store/modals/reducer';
import { getTokenBalances } from '@/store/user/actions';
import userActionTypes from '@/store/user/actionTypes';
import { approveSaga } from '@/store/user/sagas/approve';
import userSelector from '@/store/user/selectors';

import { buy, getCrowdsaleInfo } from '../actions';
import actionTypes from '../actionTypes';
import { getCrowdsaleContract } from '../utils';

export function* buySaga({
  type,
  payload: { web3Provider, amount, tokenAddress },
}: ReturnType<typeof buy>) {
  yield* put(request(type));

  const crowdsaleContract = getCrowdsaleContract(web3Provider);
  const { address: userAddress } = yield* select(userSelector.getUser);
  try {
    const { data } = yield* call(baseApi.buy, {
      amount_to_receive: amount,
      token_address: tokenAddress,
    });

    let transactionHash;
    if (tokenAddress === ETHER_ADDRESS) {
      const transaction = yield* call(
        crowdsaleContract.methods.buy(
          tokenAddress,
          data.amount_to_pay,
          data.amount_to_receive,
          data.signature_expiration_timestamp,
          data.signature,
        ).send,
        { from: userAddress, value: data.amount_to_pay },
      );
      transactionHash = transaction.transactionHash;
    } else {
      yield* call(approveSaga, {
        type: userActionTypes.APPROVE,
        payload: { web3Provider, amount: data.amount_to_pay, tokenAddress },
      });
      const transaction = yield* call(
        crowdsaleContract.methods.buy(
          tokenAddress,
          data.amount_to_pay,
          data.amount_to_receive,
          data.signature_expiration_timestamp,
          data.signature,
        ).send,
        { from: userAddress },
      );
      transactionHash = transaction.transactionHash;
    }

    yield* put(getCrowdsaleInfo({ web3Provider }));
    yield* put(getTokenBalances({ web3Provider }));

    yield* put(setActiveModal({ txHash: transactionHash }));

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.BUY, buySaga);
}
