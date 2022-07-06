export type Token = {
  address: string;
  value: number;
  fullName: string;
  symbol: string;
  image: string;
};

export type TokensState = {
  tokens: { [address: string]: Token };
};
