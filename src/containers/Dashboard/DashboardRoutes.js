import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@hoa/components/utility/loader';
import Auth from '@hoa/components/Auth';

const routes = [
  {
    path: '',
    component: lazy(() => import('../DashboardHomePage')),
    exact: true,
  },
  {
    path: 'dashboard',
    component: lazy(() => import('../Pages/Dashboard')),
  },
  {
    path: 'people/employee',
    component: lazy(() => import('../Pages/People')),
  },
  {
    path: 'people/visitor',
    component: lazy(() => import('../Pages/People')),
  },
  {
    path: 'people/request',
    component: lazy(() => import('../Pages/PeopleRequest')),
  },
  {
    path: 'device',
    component: lazy(() => import('../Pages/Device')),
  },
  {
    path: 'meeting',
    component: lazy(() => import('../Pages/Meeting')),
  },
  {
    path: 'space/all_spaces',
    component: lazy(() => import('../Pages/Space')),
  },
  {
    path: 'space/conference',
    component: lazy(() => import('../Pages/Space')),
  },
  {
    path: 'space/hot_desk',
    component: lazy(() => import('../Pages/Space')),
  },
  {
    path: 'space/office',
    component: lazy(() => import('../Pages/Space')),
  },
  {
    path: 'space/building',
    component: lazy(() => import('../Pages/Building')),
  },
  {
    path: 'space/feature',
    component: lazy(() => import('../Pages/Feature')),
  },
  {
    path: 'profile',
    component: lazy(() => import('../Pages/Profile')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  const isAdmin = Auth.getRole() === 'admin' ? true : false;
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => {
          if (!isAdmin) {
            if (route.path.indexOf('device') !== -1 || route.path.indexOf('people') !== -1) {
              return null;
            }
          }
          return (
            <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
              <route.component />
            </Route>
          )
        })}
      </Switch>
    </Suspense>
  );
}
