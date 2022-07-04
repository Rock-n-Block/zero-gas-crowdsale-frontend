import Web3 from 'web3';

import { contractsConfig, ContractsNames } from '@/config';
import { isMainnet } from '@/config/constants';

export function getCrowdsaleContract(web3Provider: Web3) {
  const { abi: crowdsaleAbi, address: crowdsaleAddress } =
    contractsConfig.contracts[ContractsNames.crowdsale][isMainnet ? 'mainnet' : 'testnet'];
  return new web3Provider.eth.Contract(crowdsaleAbi, crowdsaleAddress);
}
