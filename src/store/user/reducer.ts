import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '@/types';

const initialState: UserState = {
  address: '',
  provider: '',

  tokenBalances: {},
  key: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateTokensState: (state, action: PayloadAction<UserState['tokenBalances']>) => ({
      ...state,
      tokenBalances: {
        ...state.tokenBalances,
        ...action.payload,
      },
    }),
    disconnectWalletState: () => {
      localStorage.removeItem('walletconnect');
      return {
        ...initialState,
      };
    },
  },
});

export const { disconnectWalletState, updateUserState, updateTokensState } = userReducer.actions;

export default userReducer.reducer;
