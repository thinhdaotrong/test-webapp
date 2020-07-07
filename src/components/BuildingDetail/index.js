import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BuildingDetail from './BuildingDetail';
import {
    createBuilding,
    updateBuilding
} from 'hoa-redux/actions/building';

const mapStateToProps = (state) => {
    return {
        created: state.hoa.requests.building.createBuilding,
        updated: state.hoa.requests.building.updateBuilding,
        upload: state.hoa.requests.building.uploadImage,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                createBuilding,
                updateBuilding
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(BuildingDetail)