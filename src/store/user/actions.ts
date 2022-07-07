import { createAction } from '@reduxjs/toolkit';

import {
  ApproveReq,
  GetTokenBalanceReq,
  GetTokenBalancesPayload,
  getUserInfoPayload,
  loginPayload,
} from '@/types/requests';

import actionTypes from './actionTypes';

export const getTokenBalance = createAction<GetTokenBalanceReq>(actionTypes.GET_TOKEN_BALANCE);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const getUserInfo = createAction<getUserInfoPayload>(actionTypes.GET_USER_INFO);
export const login = createAction<loginPayload>(actionTypes.LOGIN);
export const getTokenBalances = createAction<GetTokenBalancesPayload>(
  actionTypes.GET_TOKEN_BALANCES,
);
