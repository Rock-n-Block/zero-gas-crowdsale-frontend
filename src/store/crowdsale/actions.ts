import { createAction } from '@reduxjs/toolkit';

import { GetCrowdsaleInfoPayload } from '@/types';
import { BuyPayload, ClaimPayload, RefundPayload } from '@/types/requests';

import actionTypes from './actionTypes';

export const helloWorld = createAction(actionTypes.HELLO_WORLD);
export const getCrowdsaleInfo = createAction<GetCrowdsaleInfoPayload>(
  actionTypes.GET_CROWDSALE_INFO,
);
export const buy = createAction<BuyPayload>(actionTypes.BUY);
export const claim = createAction<ClaimPayload>(actionTypes.CLAIM);
export const refund = createAction<RefundPayload>(actionTypes.REFUND);
