import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import LayoutContentWrapper from '@hoa/components/utility/layoutWrapper';
// import LayoutContent from '@hoa/components/utility/layoutContent';

export default class DashboardHomePage extends Component {
  render() {
    return (
      <Redirect
        to={{
          pathname: '/admin/dashboard',
        }}
      />
    );

    // return (
    //   <LayoutContentWrapper style={{ height: '100vh' }}>
    //     <LayoutContent>
    //       <h1>{'MINS SHOES DASHBOARD HOME'}</h1>
    //     </LayoutContent>
    //   </LayoutContentWrapper>
    // );
  }
}

