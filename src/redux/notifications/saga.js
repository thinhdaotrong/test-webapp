import { all, takeEvery, put, fork } from 'redux-saga/effects';

import actions from './actions';

const fakeApiCall = true;

export function* getNotificationsRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    // const { token } = payload;
    // if (token) {
    //   yield put({
    //     type: actions.GET_NOTIFICATIONS_SUCCESS,
    //     token,
    //     profile: 'Profile',
    //   });
    // } else {
    //   if (fakeApiCall) {
    //     yield put({
    //       type: actions.GET_NOTIFICATIONS_SUCCESS,
    //       token: 'secret token',
    //       profile: 'Profile',
    //     });
    //   } else {
    //     yield put({ type: actions.GET_NOTIFICATIONS_ERROR });
    //   }
    // }
  });
}

export function* getNotificationsSuccess() {
  yield takeEvery(actions.GET_NOTIFICATIONS_SUCCESS, function* () {
  });
}

export function* getNotificationsError() {
  yield takeEvery(actions.GET_NOTIFICATIONS_ERROR, function* () {});
}

export default function* rootSaga() {
  yield all([
    fork(getNotificationsRequest),
    fork(getNotificationsSuccess),
    fork(getNotificationsError),
  ]);
}
