import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/src/interface';

export enum Chains {
  Kovan = 'Kovan',
}
export type IChainType = 'testnet' | 'mainnet';

export interface IConnectWallet {
  wallets: string[];
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}

export interface IContracts {
  decimals: number;
  names: string[];
  contracts: {
    [index: string]: {
      testnet: {
        address: string;
        abi: any[];
      };
      mainnet: {
        address: string;
        abi: any[];
      };
    };
  };
}
