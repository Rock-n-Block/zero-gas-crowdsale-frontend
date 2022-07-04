import { createAction } from '@reduxjs/toolkit';
import { GetCrowdsaleInfoPayload } from '@/types';

import actionTypes from './actionTypes';

export const helloWorld = createAction(actionTypes.HELLO_WORLD);
export const getCrowdsaleInfo = createAction<GetCrowdsaleInfoPayload>(
  actionTypes.GET_CROWDSALE_INFO,
);
