import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ResetPassword from './ResetPassword';


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
)(ResetPassword)