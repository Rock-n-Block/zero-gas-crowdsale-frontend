import { URL } from '@/appConstants';
import {
  BuyData,
  BuyResponse,
  GetMetamaskMessageResponse,
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
  getTokens() {
    return ajax({
      method: 'get',
      url: URL.tokens,
    });
  },
  buy(data: BuyData): BuyResponse {
    return ajax({
      method: 'post',
      url: URL.buy,
      data,
    }) as any;
  },
};
