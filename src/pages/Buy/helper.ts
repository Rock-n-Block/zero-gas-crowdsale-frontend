import { Stage } from '@/types';
import BigNumber from 'bignumber.js';

export const stageTexts = {
  [Stage.UNINITIALIZED]: 'Stage 1 will start in:',
  [Stage.FIRST]: 'Stage 1 will end in:',
  [Stage.PAUSE]: 'Stage 2 will start in:',
  [Stage.SECOND]: 'Stage 2 will end in:',
};

export const getTimeLeftDate = ({
  currentStage,
  stage1StartDate,
  stage1EndDate,
  stage2StartDate,
  stage2EndDate,
}: {
  currentStage: Stage;
  stage1StartDate: Date;
  stage1EndDate: Date;
  stage2StartDate: Date;
  stage2EndDate: Date;
}) => {
  if (currentStage === Stage.UNINITIALIZED) {
    return stage1StartDate;
  }
  if (currentStage === Stage.FIRST) {
    return stage1EndDate;
  }
  if (currentStage === Stage.PAUSE) {
    return stage2StartDate;
  }
  // currentStage === Stage.SECOND
  return stage2EndDate;
};

export const getTokenImageUrl = (tokenAddress: string) =>
  `https://tokens.pancakeswap.finance/images/${tokenAddress}.png`;

export const getFormatNumber = (number: number) => number.toLocaleString().replace(',', ' ');

export const getFormatFiat = (fiat: number) => new BigNumber(fiat).decimalPlaces(2).toString();
