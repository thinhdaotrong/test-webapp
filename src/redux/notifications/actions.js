const actions = {
  GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
  GET_NOTIFICATIONS_SUCCESS: 'GET_NOTIFICATIONS_SUCCESS',
  GET_NOTIFICATIONS_ERROR: 'GET_NOTIFICATIONS_ERROR',
  getNotifications: (page, perPage) => ({ type: actions.GET_NOTIFICATIONS, payload: { page, perPage } }),
};
export default actions;
