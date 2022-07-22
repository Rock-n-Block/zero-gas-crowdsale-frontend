import BigNumber from 'bignumber.js';

import { Stage } from '@/types';

export const stageTexts = {
  [Stage.UNINITIALIZED]: 'Crowdsale will start soon',
  [Stage.INITIALIZED]: 'Stage 1 will start in:',
  [Stage.FIRST]: 'Stage 1 will end in:',
  [Stage.PAUSE]: 'Stage 2 will start in:',
  [Stage.SECOND]: 'Stage 2 will end in:',
  [Stage.END]: 'Crowdsale has ended',
};

export const getTimeLeftEnd = ({
  stage1StartDate,
  stage1EndDate,
  stage2StartDate,
  stage2EndDate,
  currentStage,
}: {
  stage1StartDate: Date;
  stage1EndDate: Date;
  stage2StartDate: Date;
  stage2EndDate: Date;
  currentStage: Stage;
}) => {
  const timeLeftDates = {
    [Stage.UNINITIALIZED]: new Date(0),
    [Stage.INITIALIZED]: stage1StartDate,
    [Stage.FIRST]: stage1EndDate,
    [Stage.PAUSE]: stage2StartDate,
    [Stage.SECOND]: stage2EndDate,
    [Stage.END]: new Date(0),
  };
  return timeLeftDates[currentStage];
};

export const getFormatNumber = (number: number) => number.toLocaleString().replaceAll(',', ' ');

export const getFormatFiat = (fiat: number) => new BigNumber(fiat).decimalPlaces(3).toString();
