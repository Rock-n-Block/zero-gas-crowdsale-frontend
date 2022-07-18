import { all, call, put, select, takeLatest } from 'typed-redux-saga';

import { ETHER_ADDRESS, ZEROGAS_DECIMALS } from '@/config/constants';
import { error, request, success } from '@/store/api/actions';
import tokenSelectors from '@/store/tokens/selectors';
import { getTokenContract } from '@/store/user/utils';
import { getNaturalTokenAmount } from '@/utils/getTokenAmount';

import { getCrowdsaleBalances } from '../actions';
import actionTypes from '../actionTypes';
import { updateCrowdSaleState } from '../reducer';
import { getCrowdsaleAddress, getZerogasAddress } from '../utils';

export function* getCrowdsaleBalancesSaga({
  type,
  payload: { web3Provider },
}: ReturnType<typeof getCrowdsaleBalances>) {
  yield* put(request(type));

  const crowdsaleAddress = getCrowdsaleAddress();
  const zerogasAddress = getZerogasAddress();
  const { tokens } = yield* select(tokenSelectors.getTokens);
  try {
    const balances = yield* all(
      Object.fromEntries(
        [...Object.keys(tokens), zerogasAddress].map((tokenAddress) => {
          if (tokenAddress === ETHER_ADDRESS) {
            return [tokenAddress, call(() => web3Provider.eth.getBalance(crowdsaleAddress))];
          }
          const tokenContract = getTokenContract(web3Provider, tokenAddress);
          return [tokenAddress, call(tokenContract.methods.balanceOf(crowdsaleAddress).call)];
        }),
      ),
    );

    yield* put(
      updateCrowdSaleState({
        balances: Object.fromEntries(
          Object.entries(balances).map(([address, balance], i) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            [
              address,
              getNaturalTokenAmount(
                +balance,
                [...Object.values(tokens), { decimals: ZEROGAS_DECIMALS }][i].decimals,
              ),
            ],
          ),
        ),
      }),
    );

    yield* put(success(type));
  } catch (err) {
    console.error(err);
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield* takeLatest(actionTypes.GET_CROWDSALE_BALANCES, getCrowdsaleBalancesSaga);
}
