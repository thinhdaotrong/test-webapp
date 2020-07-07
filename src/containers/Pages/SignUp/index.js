import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignUp from './SignUp';
import { checkEmail } from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        isChecked: state.hoa.requests.auth.checkEmail,
        infoEmail: state.hoa.entities.auth.infoEmail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                checkEmail
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignUp)