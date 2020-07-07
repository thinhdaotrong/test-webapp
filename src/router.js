import React, { lazy, Suspense, Profiler } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '@hoa/components/utility/loader';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Auth from './components/Auth';

const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));
const Notfound = lazy(() => import('./components/404'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('@hoa/containers/Pages/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    exact: true,
    component: lazy(() => import('@hoa/containers/Pages/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP_FIND_ORG,
    component: lazy(() => import('@hoa/containers/Pages/FindOrg')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP_MAGIC_LINK,
    component: lazy(() => import('@hoa/containers/Pages/MagicLink')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    exact: true,
    component: lazy(() => import('@hoa/containers/Pages/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.OPTIONS_SIGN_IN,
    component: lazy(() =>
      import('@hoa/containers/Pages/OptionsSignIn')
    ),
  },
  {
    path: PUBLIC_ROUTE.SENT_LINK,
    component: lazy(() =>
      import('@hoa/containers/Pages/SignIn/SentLink')
    ),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN_WITH_PASSWORD,
    component: lazy(() =>
      import('@hoa/containers/Pages/SignInWithPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN_MAGIC_LICK,
    component: lazy(() => import('@hoa/containers/Pages/MagicLink')),
  },
  {
    path: PUBLIC_ROUTE.FORGOT_PASSWORD,
    component: lazy(() => import('@hoa/containers/Pages/ForgotPassword')),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() => import('@hoa/containers/Pages/ResetPassword')),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD_SUCCESS,
    component: lazy(() => import('@hoa/containers/Pages/ResetPassword/ResetPasswordSuccess')),
  },
  {
    path: PUBLIC_ROUTE.SIGNIN_WAITING,
    component: lazy(() => import('@hoa/containers/Pages/Waiting')),
  },
  {
    path: PUBLIC_ROUTE.SIGNUP_WAITING,
    component: lazy(() => import('@hoa/containers/Pages/Waiting')),
  },
  {
    path: PUBLIC_ROUTE.VERIFY_EMAIL,
    component: lazy(() => import('@hoa/containers/Pages/VerifyEmail')),
  }
];

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = Auth.isLoggedIn();
  if (isLoggedIn) {
    Auth.setRole('client');
    return <Route {...rest}>{children}</Route>
  }
  return (
    <Redirect
      to={{
        pathname: '/signin',
        state: { from: location },
      }}
    />
  );
}

function PrivateRouteAdmin({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = Auth.isLoggedIn();
  if (isLoggedIn && Auth.getRoleName() === 'org_admin') {
    Auth.setRole('admin');
    return <Route {...rest}>{children}</Route>
  }
  return (
    <Redirect
      to={{
        pathname: '/signin',
        state: { from: location },
      }}
    />
  );
}

export default function Routes() {
  // const key = useLocation();
  // console.log(key);
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}

            <PrivateRouteAdmin path="/admin">
              <Dashboard />
            </PrivateRouteAdmin>
            {/* <Route path="/admin">
              <Dashboard />
            </Route> */}
            <PrivateRoute path="/client">
              <Dashboard />
            </PrivateRoute>
            {/* <Route path="/client">
              <Dashboard />
            </Route> */}
            <Route path="*">
              <Notfound/>
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
