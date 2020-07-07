import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MeetingDetail from './MeetingDetail';

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
)(MeetingDetail)