import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FindOrg from './FindOrg';
import { register } from 'hoa-redux/actions/auth';

const mapStateToProps = (state) => {
    return {
        infoEmail: state.hoa.entities.auth.infoEmail,
        isRegister: state.hoa.requests.auth.register,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                register   
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(FindOrg)