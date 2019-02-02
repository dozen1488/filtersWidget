import { handleActions } from 'redux-actions';

import {
    SET_SELECTED_CONTEXT,
    SET_DIMENSIONS_CONTEXT,
    SET_SELECTED_FIELDS
} from '../actionTypes.json';

export default handleActions({
        [SET_SELECTED_CONTEXT]: (state, { payload: {panelIndex, data} }) => {
            return state.set(
                panelIndex,
                state.get(panelIndex).set('selectedContext', data)
            );
        },
        [SET_DIMENSIONS_CONTEXT]: (state, { payload: {panelIndex, data} }) => {
            state.get(panelIndex).set('selectedDimension', data)

            return state.set(
                panelIndex,
                state.get(panelIndex).set('selectedDimension', data)
            );
        },
        [SET_SELECTED_FIELDS]: (state, { payload: {panelIndex, data} }) => {
            return state.set(
                panelIndex,
                state.get(panelIndex).set('selectedFields', data)
            );
        }
    }, null
);