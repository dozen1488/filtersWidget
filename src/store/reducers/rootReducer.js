import {
    combineReducers
} from 'redux-immutable';

import workPanelsReducer from './workPanelsReducer';

export default combineReducers({
    workPanels: workPanelsReducer,
});
