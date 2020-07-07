import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dashboard from './Dashboard';
import Auth from '@hoa/components/Auth';

import { getAllSpaces} from 'hoa-redux/actions/space';
import { getSpacesState } from 'hoa-redux/selectors/entities/space';

import {
    approveUser,
    getJoinRequests
} from 'hoa-redux/actions/user';
import { getPeopleRequestsState } from 'hoa-redux/selectors/entities/user';

import { getMeetings } from 'hoa-redux/actions/meeting';
import { getMeetingsList, getCurrentMeeting } from 'hoa-redux/selectors/entities/meeting';

const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        spaces: getSpacesState(state),
        users: getPeopleRequestsState(state),
        meetings: getMeetingsList(state),
        currentMeeting: getCurrentMeeting(state),
        isAdmin,
        getSpaces: state.hoa.requests.space.getAllSpaces,
        getRequests: state.hoa.requests.user.getJoinRequests
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getAllSpaces,
                approveUser,
                getJoinRequests,
                getMeetings
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)