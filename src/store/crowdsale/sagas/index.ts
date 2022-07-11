import { fork } from 'redux-saga/effects';

import watchBuySaga from './buy';
import watchClaimSaga from './claim';
import watchGetCrowdsaleInfoSaga from './getCrowdsaleInfo';
import watchRefundSaga from './refund';

export default function* CrowdSaleSagas() {
  yield fork(watchGetCrowdsaleInfoSaga);
  yield fork(watchBuySaga);
  yield fork(watchClaimSaga);
  yield fork(watchRefundSaga);
}
