import { fork } from 'redux-saga/effects';

import watchGetCrowdsaleInfoSaga from './getCrowdsaleInfo';

export default function* CrowdSaleSagas() {
  yield fork(watchGetCrowdsaleInfoSaga);
}
