import {
    combineReducers
} from 'redux-immutable';

import tablesReducer from './contextsReducer';
import workPanelsReducer from './workPanelsReducer';

export default combineReducers({
    workPanels: workPanelsReducer,
    contexts: tablesReducer
});
