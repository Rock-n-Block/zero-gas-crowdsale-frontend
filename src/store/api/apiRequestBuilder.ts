import { URL } from '@/appConstants';
import {
  BuyData,
  BuyResponse,
  GetMetamaskMessageResponse,
  GetTokensResponse,
  MetamaskLoginData,
  MetamaskLoginResponse,
} from '@/types/api';

import ajax from './ajax';

export const baseApi = {
  getMetamaskMessage(): GetMetamaskMessageResponse {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    }) as any;
  },
  metamaskLogin(data: MetamaskLoginData): MetamaskLoginResponse {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data,
    }) as any;
  },
  getTokens(): GetTokensResponse {
    return ajax({
      method: 'get',
      url: URL.tokens,
    }) as any;
  },
  buy(data: BuyData): BuyResponse {
    return ajax({
      method: 'post',
      url: URL.buy,
      data,
    }) as any;
  },
};
