import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as applicationActions from '../actions';

export default class BaseConnector {
    isBusy(state, statesNames) {
        for (let index = 0; index < statesNames.length; index += 1) {
            const stateName = statesNames[index];
            const immutableCurrentState = state.get(stateName);
            const currentState = immutableCurrentState && immutableCurrentState.toJS();

            if (currentState && currentState.isBusy) {
                return true;
            }
        }

        return false;
    }

    mapStateToProps(state) {
        return {
            tables: state.get('tables'),
            selectedContext: state.get('selectedContext')
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
