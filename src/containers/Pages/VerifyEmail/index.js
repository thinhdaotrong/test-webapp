import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VerifyEmail from './VerifyEmail';
import { verifyEmail, sendEmail } from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        result: state.hoa.requests.auth.verifyEmail,
        sent: state.hoa.requests.auth.sendEmail,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                verifyEmail,
                sendEmail
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(VerifyEmail)