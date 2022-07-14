import Web3 from 'web3';

import { contractsConfig, ContractsNames } from '@/config';
import { isMainnet } from '@/config/constants';
import { CrowdsaleAbi, Stage } from '@/types';

export function getCrowdsaleContract(web3Provider: Web3): CrowdsaleAbi {
  const { abi: crowdsaleAbi, address: crowdsaleAddress } =
    contractsConfig.contracts[ContractsNames.crowdsale][isMainnet ? 'mainnet' : 'testnet'];
  return new web3Provider.eth.Contract(crowdsaleAbi, crowdsaleAddress) as any;
}

export const getStage = ({
  stage1StartDate,
  stage1EndDate,
  stage2StartDate,
  stage2EndDate,
  totalBought,
  hardcap,
}: {
  stage1StartDate: Date;
  stage1EndDate: Date;
  stage2StartDate: Date;
  stage2EndDate: Date;
  totalBought: number;
  hardcap: number;
}) => {
  if (+stage1StartDate === 0) {
    return Stage.UNINITIALIZED;
  }
  if (totalBought === hardcap) {
    return Stage.END;
  }

  const currentDate = new Date();
  if (currentDate < stage1StartDate) {
    return Stage.INITIALIZED;
  }
  if (currentDate < stage1EndDate) {
    return Stage.FIRST;
  }
  if (currentDate < stage2StartDate) {
    return Stage.PAUSE;
  }
  if (currentDate < stage2EndDate) {
    return Stage.SECOND;
  }
  return Stage.END;
};
