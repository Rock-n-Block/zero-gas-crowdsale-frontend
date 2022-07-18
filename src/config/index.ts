import { TChainsConfig } from '@amfi/connect-wallet/dist/interface';

import { Chains, IConnectWallet, IContracts, WalletProviders } from '@/types';

import { crowdsaleAbi, erc20Abi } from './abi';
import { isMainnet } from './constants';

const INFURA_KEY = 'c40df013fb4d421db10a8316fabb5deb';

export const chains: TChainsConfig<Chains, WalletProviders> = {
  [Chains.Kovan]: {
    name: Chains.Kovan,
    network: {
      chainID: isMainnet ? 1 : 42,
      chainName: isMainnet ? 'Ethereum' : 'Kovan Testnet',
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
    },
    keys: {
      infuraId: INFURA_KEY,
    },
  },
};

export const connectWallet = (chainName: Chains): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask'],
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
  };
};

// eslint-disable-next-line no-shadow
export enum ContractsNames {
  crowdsale = 'crowdsale',
  zerogas = 'zerogas',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.crowdsale]: {
      mainnet: {
        address: '0x615fdCF804b604A493ee518f5FB1809cFecbD6cD',
        abi: crowdsaleAbi,
      },
      testnet: {
        address: '0x1b9D94a3853BFd32947eD451436e6DA06cDb2C4E',
        abi: crowdsaleAbi,
      },
    },
    [ContractsNames.zerogas]: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '0x0A563BCb1fc6d236416EdCF674B0Ce11Cb73b6A3',
        abi: erc20Abi,
      },
    },
  },
};

export const networkDataForAddToMetamask = {
  chainID: isMainnet ? 1 : 42,
  chainName: isMainnet ? 'Ethereum' : 'Kovan Testnet',
  rpcUrls: [
    isMainnet
      ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
      : `https://kovan.infura.io/v3/${INFURA_KEY}`,
  ],
  blockExplorerUrls: [isMainnet ? 'https://etherscan.io/' : 'https://kovan.etherscan.io/'],
};
