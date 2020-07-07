import { combineReducers } from 'redux';
import { AuthTypes } from 'hoa-redux/action_types'
import App from '@hoa/redux/app/reducer';
import ThemeSwitcher from '@hoa/redux/themeSwitcher/reducer';
import Ecommerce from '@hoa/redux/ecommerce/reducer';
import LanguageSwitcher from '@hoa/redux/languageSwitcher/reducer';

// import hoa from '@hoa/redux/hoa/reducers';
import hoa from 'hoa-redux/reducers';

const appReducer = combineReducers({
  App,
  ThemeSwitcher,
  Ecommerce,
  LanguageSwitcher,
  hoa,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === AuthTypes.LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
