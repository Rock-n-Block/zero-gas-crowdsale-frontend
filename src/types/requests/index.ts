import Web3 from 'web3';

import { ContractsNames } from '@/config';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export interface RequestWithWeb3Provider {
  web3Provider: Web3;
}

export interface GetTokenBalanceReq extends RequestWithWeb3Provider {
  address: string;
}

export interface ApproveReq extends RequestWithWeb3Provider {
  contract: ContractsNames;
  spenderAddress: string;
  amount: string;
}
