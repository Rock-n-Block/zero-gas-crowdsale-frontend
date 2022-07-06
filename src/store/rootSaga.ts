import { fork } from 'redux-saga/effects';

/* PLOP_INJECT_IMPORT_SAGA */
import tokensSaga from '@/store/tokens/sagas';
import CrowdSaleSaga from '@/store/crowdsale/sagas';
import userSaga from '@/store/user/sagas';

export default function* rootSaga() {
  yield fork(userSaga);
  /* PLOP_INJECT_FORK_SAGA */
  yield fork(tokensSaga);
  yield fork(CrowdSaleSaga);
}
