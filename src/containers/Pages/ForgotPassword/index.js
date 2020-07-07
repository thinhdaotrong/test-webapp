import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ForgotPassword from './ForgotPassword';

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword)