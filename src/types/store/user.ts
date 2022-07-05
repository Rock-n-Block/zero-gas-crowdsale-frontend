export type UserState = {
  address: string;
  provider: string;

  tokenBalances: { [address: string]: number };
  key: string; // backend access token
};
