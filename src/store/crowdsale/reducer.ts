import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CrowdSaleState } from '@/types';

const initialState: CrowdSaleState = {
  isOpen: false,
};

export const CrowdSaleReducer = createSlice({
  name: 'CrowdSale',
  initialState,
  reducers: {
    updateCrowdSaleState: (state, action: PayloadAction<Partial<CrowdSaleState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateCrowdSaleOpenState: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOpen: action.payload,
    }),
  },
});

export const { updateCrowdSaleState, updateCrowdSaleOpenState } = CrowdSaleReducer.actions;

export default CrowdSaleReducer.reducer;