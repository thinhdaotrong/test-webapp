import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FeatureDetail from './FeatureDetail';
import Auth from '@hoa/components/Auth';

import {
    updateFeature,
    createFeature
} from 'hoa-redux/actions/feature';

import {
} from 'hoa-redux/selectors/entities/feature';


const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        isAdmin,
        updated: state.hoa.requests.feature.updateFeature,
        created: state.hoa.requests.feature.createFeature,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                updateFeature,
                createFeature
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(FeatureDetail)