import { AbiItem } from 'web3-utils';

import { contractsConfig, ContractsNames } from '@/config';
import { isMainnet } from '@/config/constants';

export const getContractDataByHisName = (name: ContractsNames): [AbiItem[], string] => {
  const { abi: contractAbi, address: contractAddress } =
    contractsConfig.contracts[name][isMainnet ? 'mainnet' : 'testnet'];

  return [contractAbi as AbiItem[], contractAddress];
};
