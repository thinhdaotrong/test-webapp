import React, { Component } from 'react';
import People from '@hoa/components/People';
import { withRouter } from 'react-router-dom';

class Employee extends Component {
    render () {
        const {location, users} = this.props;
        if (location.pathname === '/admin/people/employee' || location.pathname === '/client/people/employee') {
            return (  
                <People
                    selected={'employee'}
                />
            )
        }
        return (  
            <People
                selected={'visitor'}
            />
        )
    }
}

export default withRouter(Employee);

