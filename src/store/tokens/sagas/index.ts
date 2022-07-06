import { fork } from 'redux-saga/effects';

import watchGetTokens from './getTokens';

export default function* tokensSagas() {
  yield fork(watchGetTokens);
}
