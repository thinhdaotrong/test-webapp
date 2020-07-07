const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  REMEMBER_ME: 'REMEMBER_ME',
  NOT_REMEMBER_ME: 'NOT_REMEMBER_ME',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (token = false, userEmail = null) => ({
    type: actions.LOGIN_REQUEST,
    payload: { token, userEmail },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;
