import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Profile from './Profile';

import {
   getUser,
   updateUser
} from 'hoa-redux/actions/user';

import {
    getUserState
} from 'hoa-redux/selectors/entities/user';

const mapStateToProps = (state) => {
    return {
        user: getUserState(state),
        updated: state.hoa.requests.user.updateUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getUser,
                updateUser
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Profile)