import Web3 from 'web3';

export type CrowdSaleState = {
  isOpen: boolean;
  hardcap: number;
  totalBuyed: number;
};

export interface GetCrowdsaleInfoPayload {
  web3Provider: Web3;
}
