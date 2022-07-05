import type { State, TokensState } from '@/types';

export default {
  getTokens: (state: State): TokensState => state.tokens,
  getProp:
    <T extends keyof TokensState>(propKey: T) =>
    (state: State) =>
      state.tokens[propKey],
  getToken: (symbol: string) => (state: State) =>
    Object.values(state.tokens.tokens).find((token) => token.symbol === symbol),
};
