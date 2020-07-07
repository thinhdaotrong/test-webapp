import configureServiceStore from 'hoa-redux/store/configureStore.dev';
import appReducer from './root-reducer';

export const store = configureServiceStore({}, appReducer);