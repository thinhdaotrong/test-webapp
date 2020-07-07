import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Waiting from './Waiting';   
import {
    login,
    signup,
} from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        isLogin: state.hoa.requests.auth.signin,
        isSignup: state.hoa.requests.auth.signup,
        currentUser: state.hoa.entities.user.currentUser,
        action: state.hoa.entities.auth.action
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                login,
                signup
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Waiting)