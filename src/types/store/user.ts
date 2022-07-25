import { WalletProviders } from '..';

export type UserState = {
  address: string;
  provider: WalletProviders | null;

  tokenBalances: { [address: string]: number };
  key: string; // backend access token
};
