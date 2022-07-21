import { TChainsConfig } from '@amfi/connect-wallet/dist/interface';

import { Chains, IConnectWallet, IContracts, WalletProviders } from '@/types';

import { crowdsaleAbi, erc20Abi } from './abi';
import { isMainnet } from './constants';

const INFURA_KEY = '3c81b211de6f4f4a9e94ba584d4cab4f';

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
    [ContractsNames.zerogas]: {
      mainnet: {
        address: '0xb0D8E79F484EC6DF92bfc032735D7F9B19e361eF',
        abi: erc20Abi,
      },
      testnet: {
        address: '',
        abi: erc20Abi,
      },
    },
    [ContractsNames.crowdsale]: {
      mainnet: {
        address: '0x633c18f93BC465439e55e7f9C70310E0786EB614',
        abi: crowdsaleAbi,
      },
      testnet: {
        address: '',
        abi: crowdsaleAbi,
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
