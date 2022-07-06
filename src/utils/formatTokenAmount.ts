import BigNumber from 'bignumber.js';

import { RoundingModes } from '@/types';

export const toDecimals = (balance: string | number, decimals = 18): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).multipliedBy(new BigNumber(10).pow(decimals));

  return displayValue.toFixed();
};

export const fromDecimals = (
  balance: string | number,
  decimals = 18,
  roundingMode = RoundingModes.down,
): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));
  return displayValue.toFixed(decimals, roundingMode);
};
