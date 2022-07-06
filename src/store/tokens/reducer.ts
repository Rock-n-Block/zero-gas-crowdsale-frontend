import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TokensState } from '@/types/store/tokens';

const initialState: TokensState = {
  tokens: {},
};

export const tokensReducer = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    updateTokensState: (state, action: PayloadAction<Partial<TokensState>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { updateTokensState } = tokensReducer.actions;

export default tokensReducer.reducer;
