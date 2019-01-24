import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            tables: state.get('tables')
        };
    }

    mapDispatchToProps() {
        return {};
    }

    bindActionCreators(...args) {
        return bindActionCreators(...args);
    }

    connect(Component) {
        return connect(
            this.mapStateToProps.bind(this),
            this.mapDispatchToProps.bind(this)
        )(Component);
    }
}
