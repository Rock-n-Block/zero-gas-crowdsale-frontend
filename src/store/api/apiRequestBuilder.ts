import { URL } from '@/appConstants';
import { GetMetamaskMessageResponse, MetamaskLoginResponse } from '@/types/api';
import { LoginReq } from '@/types/requests';

import ajax from './ajax';

export const baseApi = {
  getMetamaskMessage(): GetMetamaskMessageResponse {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    }) as any;
  },
  metamaskLogin(data: LoginReq): MetamaskLoginResponse {
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
};
