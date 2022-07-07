import { fork } from 'redux-saga/effects';

import approve from './approve';
import getTokenBalance from './getTokenBalance';
import watchGetTokenBalances from './getTokenBalances';
import watchGetUserInfo from './getUserInfo';
import watchLogin from './login';

export default function* userSagas() {
  yield fork(getTokenBalance);
  yield fork(approve);
  yield fork(watchGetUserInfo);
  yield fork(watchLogin);
  yield fork(watchGetTokenBalances);
}
