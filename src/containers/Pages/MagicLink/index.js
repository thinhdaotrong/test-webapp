import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MagicLink from './MagicLink';
import {  } from 'hoa-redux/actions/auth';

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
)(MagicLink)