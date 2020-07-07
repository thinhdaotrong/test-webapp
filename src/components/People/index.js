import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import People from './People';
import Auth from '@hoa/components/Auth';
import {
    updateUser,
    createUser,
    getAllUsers,
    suspendUser
} from 'hoa-redux/actions/user';

import {
    getUsersState
} from 'hoa-redux/selectors/entities/user';

const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        isAdmin,
        employees: getUsersState(state),
        updated: state.hoa.requests.user.updateUser,
        got: state.hoa.requests.user.getUsers,   
        created: state.hoa.requests.user.createUser,     
        totalItems: state.hoa.entities.user.meta.total_items,
        users: getUsersState(state),
        upload: state.hoa.requests.user.uploadImage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getAllUsers,
                updateUser,
                createUser,
                suspendUser
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(People)