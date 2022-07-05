import { createAction } from '@reduxjs/toolkit';

import actionTypes from './actionTypes';

export const getTokens = createAction(actionTypes.GET_TOKENS);
