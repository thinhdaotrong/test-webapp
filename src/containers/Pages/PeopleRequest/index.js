import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PeopleRequest from './PeopleRequest';
import Auth from '@hoa/components/Auth';

import {
    getJoinRequests,
    approveUser
} from 'hoa-redux/actions/user';

import {
    getPeopleRequestsState
} from 'hoa-redux/selectors/entities/user';

const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        users: getPeopleRequestsState(state),
        isAdmin,
        got: state.hoa.requests.user.getJoinRequests,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getJoinRequests,
                approveUser
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(PeopleRequest)