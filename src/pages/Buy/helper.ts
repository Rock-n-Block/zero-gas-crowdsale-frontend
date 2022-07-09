import BigNumber from 'bignumber.js';

import { Stage } from '@/types';

export const stageTexts = {
  [Stage.UNINITIALIZED]: 'Stage 1 will start in:',
  [Stage.FIRST]: 'Stage 1 will end in:',
  [Stage.PAUSE]: 'Stage 2 will start in:',
  [Stage.SECOND]: 'Stage 2 will end in:',
};

export const getStageText = (currentStage: Stage, staged2EndTime: Date) => {
  if (new Date() > staged2EndTime) {
    return 'Crowdsale ended, claim your tokens';
  }
  return stageTexts[currentStage];
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
  const timeLeftDates = {
    [Stage.UNINITIALIZED]: stage1StartDate,
    [Stage.FIRST]: stage1EndDate,
    [Stage.PAUSE]: stage2StartDate,
    [Stage.SECOND]: stage2EndDate,
  };
  return timeLeftDates[currentStage];
};

export const getFormatNumber = (number: number) => number.toLocaleString().replace(',', ' ');

export const getFormatFiat = (fiat: number) => new BigNumber(fiat).decimalPlaces(2).toString();
