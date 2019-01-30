import {
    combineReducers
} from 'redux-immutable';

import selectedContextReducer from './selectedContextReducer';
import tablesReducer from './tablesReducer';

export default combineReducers({
    selectedContext: selectedContextReducer,
    tables: tablesReducer
});
