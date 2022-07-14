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
  tokenAddress: string;
}

export interface ApproveReq extends RequestWithWeb3Provider {
  tokenAddress: string;
  amount: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface getUserInfoPayload extends RequestWithWeb3Provider {}

export interface loginPayload extends RequestWithWeb3Provider {
  provider: string;
  address: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTokensPayload extends RequestWithWeb3Provider {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetTokenBalancesPayload extends RequestWithWeb3Provider {}

export interface BuyPayload extends RequestWithWeb3Provider {
  amount: string;
  tokenAddress: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClaimPayload extends RequestWithWeb3Provider {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RefundPayload extends RequestWithWeb3Provider {}
