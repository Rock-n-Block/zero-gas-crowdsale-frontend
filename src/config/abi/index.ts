import { AbiItem } from 'web3-utils';

import untypedCrowdsaleAbi from './crowdsale.abi.json';
import untypedErc20Abi from './erc20.abi.json';

const erc20Abi = untypedErc20Abi as AbiItem[];
const crowdsaleAbi = untypedCrowdsaleAbi as AbiItem[];

export { erc20Abi, crowdsaleAbi };
