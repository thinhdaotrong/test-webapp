import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SignIn from './SignIn';
import {
    sendMagicLink
} from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        sent: state.hoa.requests.auth.sendMagicLink,
        statusSend: state.hoa.entities.auth.magicLink
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                sendMagicLink
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)