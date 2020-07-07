import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Space from './Space';
import Auth from '@hoa/components/Auth';

import {
    getAllSpaces,
    deleteSpaces,
} from 'hoa-redux/actions/space';

import {
    getSpacesState
} from 'hoa-redux/selectors/entities/space';


const mapStateToProps = (state) => {;

    const isAdmin = Auth.getRole() === 'admin' ? true : false;
    return {
        spaces: getSpacesState(state),
        deleted: state.hoa.requests.space.deleteSpaces,
        got: state.hoa.requests.space.getAllSpaces,
        isAdmin,
        totalItems: state.hoa.entities.space.meta.total_items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                getAllSpaces,
                deleteSpaces,
            },
            dispatch
        ),
    };
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Space)