export type UserState = {
  address: string;
  provider: string; // not used

  tokenBalances: { [address: string]: number };
  key: string; // backend access token
};
