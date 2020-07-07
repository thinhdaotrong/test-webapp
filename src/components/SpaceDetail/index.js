import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SpaceDetail from './SpaceDetail';
import Auth from '@hoa/components/Auth';

import {
    createSpace,
    updateSpace
} from 'hoa-redux/actions/space';

import {
    getBuildingsState
} from 'hoa-redux/selectors/entities/building';


import {
    getAllBuildings
} from 'hoa-redux/actions/building';

import {
    getAllFeatures
} from 'hoa-redux/actions/feature';

import {
    getFeaturesState
} from 'hoa-redux/selectors/entities/feature';

const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        buildings: getBuildingsState(state),
        created: state.hoa.requests.space.createSpace,
        updated: state.hoa.requests.space.updateSpace,
        upload: state.hoa.requests.space.uploadImage,
        orgId: Auth.getOrgId(),
        isAdmin,
        features: getFeaturesState(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                createSpace,
                updateSpace,
                getAllBuildings,
                getAllFeatures
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SpaceDetail)