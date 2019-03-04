import {
    combineReducers
} from 'redux-immutable';
import { fromJS } from 'immutable';


import {
    GET_SESSION_SUCCESS
} from '../actions/actionTypes.json';

import contextsReducer from './contextsReducer';
import workPanelReducer from './workPanelReducer';

const panelReducer = combineReducers({
    contexts: contextsReducer,
    workPanel: workPanelReducer
});

export default function (state, action) {
    if (action.type === GET_SESSION_SUCCESS) {
        return fromJS(action.value.workPanels);
    }
    if (action.panelIndex !== undefined) {
        return state.set(action.panelIndex, panelReducer(state.get(action.panelIndex), action));
    } else if ((action.payload && action.payload.panelIndex) !== undefined) {
        return state.set(action.payload.panelIndex, panelReducer(state.get(action.payload.panelIndex), action));
    } else {
        return state.map(panel => panelReducer(panel, action));
    }
};
