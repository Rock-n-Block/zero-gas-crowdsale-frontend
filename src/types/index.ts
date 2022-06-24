export * from './connect';
export * from './store';
export * from './contracts';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

// eslint-disable-next-line no-shadow
export enum WalletProviders {
  metamask = 'MetaMask',
}

export type TReferrals = {
  registerTime: number;
  memberCode: string;
  memberLiquidity: number;
};

// eslint-disable-next-line no-shadow
export enum RoundingModes {
  up,
  down,
}
