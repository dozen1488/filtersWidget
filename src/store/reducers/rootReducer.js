import {
    combineReducers
} from 'redux-immutable';

import tablesReducer from './tablesReducer';
import workPanelsReducer from './workPanelsReducer';

export default combineReducers({
    workPanels: workPanelsReducer,
    contexts: tablesReducer
});
