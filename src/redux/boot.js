import { Client4 } from 'hoa-redux/client';
import { DefaultServerUrl } from '@hoa/assets/config';
import Auth from '../components/Auth';

export default () => {
  if (Auth.isLoggedIn()){
    return new Promise(() => {
      Client4.setToken(Auth.isLoggedIn());
      Client4.setUrl(DefaultServerUrl);
    });
  }
  return new Promise(() => {
    Client4.setUrl(DefaultServerUrl);
  });
}
