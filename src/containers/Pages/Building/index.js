import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Auth from '@hoa/components/Auth';
import Building from './Building';
import {
    getAllBuildings,
    deleteBuildings
} from 'hoa-redux/actions/building';

import {
    getBuildingsState
} from 'hoa-redux/selectors/entities/building';

const mapStateToProps = (state) => {
    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        buildings: getBuildingsState(state),
        deleted: state.hoa.requests.building.deleteBuildings,
        isAdmin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getAllBuildings,
                deleteBuildings
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Building)