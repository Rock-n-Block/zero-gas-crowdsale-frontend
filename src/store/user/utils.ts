import Web3 from 'web3';

import { erc20Abi } from '@/config/abi';
import { Erc20Abi } from '@/types';

export function getTokenContract(web3Provider: Web3, address: string): Erc20Abi {
  return new web3Provider.eth.Contract(erc20Abi, address) as any;
}
