import Web3 from 'web3';

export enum Stage {
  UNINITIALIZED = -2,
  INITIALIZED = -1,
  FIRST = 1,
  PAUSE = 0,
  SECOND = 2,
  END = 3,
}

export type CrowdSaleState = {
  isOpen: boolean;

  isAdmin: boolean;
  hardcap: number; // in 0GAS
  totalBought: number; // in 0GAS
  userBought: number; // in 0GAS
  totalClaimed: number; // in 0GAS

  stage1StartDate: number;
  stage1EndDate: number;
  stage2StartDate: number;
  stage2EndDate: number; // buy end & claim start time

  zeroGasPrice: number; // in $
  softcap: number; // in 0GAS
  minPurchase: number; // least one-time buy amount in 0GAS
  maxPurchase: number; // left to buy in 0GAS

  balances: { [address: string]: number };
};

export interface GetCrowdsaleInfoPayload {
  web3Provider: Web3;
}
