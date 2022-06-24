import { createAction } from '@reduxjs/toolkit';

import { ApproveReq, GetTokenBalanceReq } from '@/types/requests';

import actionTypes from './actionTypes';

export const getTokenBalance = createAction<GetTokenBalanceReq>(actionTypes.GET_TOKEN_BALANCE);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
