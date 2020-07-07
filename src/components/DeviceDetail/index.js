import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Detail from './DeviceDetail';

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
)(Detail)