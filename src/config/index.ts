import { TChainsConfig } from '@amfi/connect-wallet/dist/interface';

import { Chains, IConnectWallet, IContracts, WalletProviders } from '@/types';

import { crowdsaleAbi, erc20Abi } from './abi';
import { isMainnet } from './constants';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const ZEROGAS_ADDRESS_MAINNET = process.env.REACT_APP_ZEROGAS_ADDRESS_MAINNET || '';
const ZEROGAS_ADDRESS_TESTNET = process.env.REACT_APP_ZEROGAS_ADDRESS_TESTNET || '';
const CROWDSALE_ADDRESS_MAINNET = process.env.REACT_APP_CROWDSALE_ADDRESS_MAINNET || '';
const CROWDSALE_ADDRESS_TESTNET = process.env.REACT_APP_CROWDSALE_ADDRESS_TESTNET || '';

export const chains: TChainsConfig<Chains, WalletProviders> = {
  [Chains.Kovan]: {
    name: Chains.Kovan,
    network: {
      chainID: isMainnet ? 1 : 42,
      chainName: isMainnet ? 'Ethereum' : 'Kovan Testnet',
    },
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            [isMainnet ? 1 : 42]: isMainnet
              ? `https://mainnet.infura.io/v3/${INFURA_KEY}`
              : `https://kovan.infura.io/v3/${INFURA_KEY}`,
          },
        },
      },
    },
    keys: {
      infuraId: INFURA_KEY,
    },
  },
};

export const connectWallet = (chainName: Chains): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect'],
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
        address: ZEROGAS_ADDRESS_MAINNET,
        abi: erc20Abi,
      },
      testnet: {
        address: ZEROGAS_ADDRESS_TESTNET,
        abi: erc20Abi,
      },
    },
    [ContractsNames.crowdsale]: {
      mainnet: {
        address: CROWDSALE_ADDRESS_MAINNET,
        abi: crowdsaleAbi,
      },
      testnet: {
        address: CROWDSALE_ADDRESS_TESTNET,
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
