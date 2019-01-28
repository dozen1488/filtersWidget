import {
    combineReducers
} from 'redux-immutable';

import selectedContextReducer from './selectedContextReducer';

export default combineReducers({
    selectedContext: selectedContextReducer,
    tables: state => state
});
