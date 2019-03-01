import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as applicationActions from '../store/actions';

export default class BaseConnector {
    mapStateToProps(state) {
        return {
            workPanels: state.get('workPanels')
        };
    }

    mapDispatchToProps(dispatch) {
        return bindActionCreators(applicationActions, dispatch);
    }

    connect(Component) {
        return connect(
            this.mapStateToProps.bind(this),
            this.mapDispatchToProps.bind(this)
        )(Component);
    }
}
