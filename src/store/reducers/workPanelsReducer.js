import { handleActions } from 'redux-actions';

import {
    SET_SELECTED_CONTEXT,
    SET_SELECTED_DIMENSION,
    SET_SELECTED_FIELDS
} from '../actionTypes.json';

export default handleActions({
        [SET_SELECTED_CONTEXT]: (state, { payload: {panelIndex, data} }) => {
            return state.set(
                panelIndex,
                state.get(panelIndex)
                    .set('selectedContextIndex', data)
                    .set('selectedDimensionIndex', null)
                    .set('selectedFields', [])
            );
        },
        [SET_SELECTED_DIMENSION]: (state, { payload: {panelIndex, data} }) => {
            return state.set(
                panelIndex,
                state.get(panelIndex)
                    .set('selectedDimensionIndex', data)
                    .set('selectedFields', [])
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