import { createAction } from '@reduxjs/toolkit';

import { GetTokensPayload } from '@/types/requests';

import actionTypes from './actionTypes';

export const getTokens = createAction<GetTokensPayload>(actionTypes.GET_TOKENS);
