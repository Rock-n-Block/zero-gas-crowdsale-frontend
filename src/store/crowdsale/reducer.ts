import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CrowdSaleState } from '@/types';

const initialState: CrowdSaleState = {
  isOpen: false,

  isAdmin: false,
  hardcap: 0,
  totalBought: 0,
  userBought: 0,
  totalClaimed: 0,
  stage1StartDate: 0,
  stage1EndDate: 0,
  stage2StartDate: 0,
  stage2EndDate: 0,
  zeroGasPrice: 0,
  softcap: 0,
  minPurchase: 0,
  maxPurchase: 0,

  balances: {},
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
