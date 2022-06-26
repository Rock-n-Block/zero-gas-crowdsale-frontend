import { createAction } from '@reduxjs/toolkit';

import actionTypes from './actionTypes';

export const helloWorld = createAction(actionTypes.HELLO_WORLD);
