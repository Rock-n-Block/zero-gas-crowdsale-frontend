import Web3 from 'web3';

export enum Stage {
  UNINITIALIZED = -1,
  FIRST = 1,
  PAUSE = 0,
  SECOND = 2,
}

export type CrowdSaleState = {
  isOpen: boolean;

  hardcap: number; // in 0GAS
  totalBought: number; // in 0GAS
  userBought: number; // in 0GAS

  currentStage: Stage;
  stage1StartDate: number;
  stage1EndDate: number;
  stage2StartDate: number;
  stage2EndDate: number; // buy end & claim start time

  zeroGasPrice: number; // in $
  softcap: number; // in 0GAS
  minPurchase: number; // least one-time buy amount in 0GAS
  maxPurchase: number; // left to buy in 0GAS
};

export interface GetCrowdsaleInfoPayload {
  web3Provider: Web3;
}
