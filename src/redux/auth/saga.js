import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@hoa/lib/helpers/utility';
import actions from './actions';

const history = createBrowserHistory();
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    // const { token, userEmail } = payload;
    // if (token) {
    //   yield put({
    //     type: actions.LOGIN_SUCCESS,
    //     token,
    //     userEmail,
    //     profile: 'Profile',
    //   });
    // } else {
    //   if (fakeApiCall) {
    //     yield put({
    //       type: actions.LOGIN_SUCCESS,
    //       token: 'secret token',
    //       userEmail,
    //       profile: 'Profile',
    //     });
    //   } else {
    //     yield put({ type: actions.LOGIN_ERROR });
    //   }
    // }
  });
}

export function* loginSuccess() {
  // yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
  //   yield localStorage.setItem('id_token', payload.token);
  //   yield localStorage.setItem('user_email', payload.userEmail);
  // });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    clearToken();
    yield put(() => history.push('/'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    const userEmail = getToken().get('userEmail');
    if (token) {
      // yield put({
      //   type: actions.LOGIN_SUCCESS,
      //   token,
      //   userEmail,
      //   profile: 'Profile',
      // });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
