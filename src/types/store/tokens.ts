export type Token = {
  address: string;
  value: number;
  symbol: string;
};

export type TokensState = {
  tokens: { [address: string]: Token };
};
