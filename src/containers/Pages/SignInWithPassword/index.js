import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignInWithPassword from './SignInWithPassword';
import { login } from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        login: state.hoa.requests.auth.signin,
        currentUser: state.hoa.entities.user.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                login
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignInWithPassword)