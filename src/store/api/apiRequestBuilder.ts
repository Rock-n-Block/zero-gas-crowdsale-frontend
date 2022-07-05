import { URL } from '@/appConstants';
import { LoginReq } from '@/types/requests';
import ajax from './ajax';

export const baseApi = {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    });
  },
  metamaskLogin(data: LoginReq) {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data,
    });
  },
  getTokens() {
    return ajax({
      method: 'get',
      url: URL.tokens,
    });
  },
};
