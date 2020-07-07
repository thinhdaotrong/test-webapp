import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Feature from './Feature';
import Auth from '@hoa/components/Auth';

import {
    getAllFeatures,
    deleteFeatures
} from 'hoa-redux/actions/feature';

import {
    getFeaturesState
} from 'hoa-redux/selectors/entities/feature';


const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        features: getFeaturesState(state),
        isAdmin,
        got: state.hoa.requests.feature.getAllFeatures,
        deleted: state.hoa.requests.feature.deleteFeature,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getAllFeatures,
                deleteFeatures
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Feature)