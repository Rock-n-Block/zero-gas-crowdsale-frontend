import { fork } from 'redux-saga/effects';

import getLockupDataSaga from './exampleSaga';

export default function* CrowdSaleSagas() {
  yield fork(getLockupDataSaga);
}
