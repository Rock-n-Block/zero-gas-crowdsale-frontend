import BigNumber from 'bignumber.js';

// Convert to contract's token amount format
export function getDecimalTokenAmount(amount: number, decimals: number): string {
  return new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toFixed();
}

// Convert from contract's token amount format
export function getNaturalTokenAmount(amount: number, decimals: number): number {
  return new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals)).toNumber();
}
