import { handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

import { START_PAGE_BARS_NUMBER, START_PAGE_PANELS_IN_BAR_NUMBER } from '../constants/config';
import {
    SET_SELECTED_CONTEXT,
    SET_SELECTED_DIMENSION,
    SET_SELECTED_FIELDS,
    GET_SESSION_SUCCESS,
    RESET_WORKPANELS
} from '../actions/actionTypes.json';

export default handleActions({
        [GET_SESSION_SUCCESS]: (state, { value }) => {
            return (value && value.workPanels) ? fromJS(value.workPanels) : state;
        },
        [SET_SELECTED_CONTEXT]: (state, { payload: {data} }) => {
            return state
                .set('selectedContexts', data)
                .set('selectedDimensions', List())
                .set('selectedFields', List());
        },
        [SET_SELECTED_DIMENSION]: (state, { payload: {data} }) => {
            return state
                .set('selectedDimensions', data)
                .set('selectedFields', List());
        },
        [SET_SELECTED_FIELDS]: (state, { payload: {data} }) => {
            return state.set('selectedFields', List(data));
        },
        [RESET_WORKPANELS]: () => {
            return new Array(START_PAGE_PANELS_IN_BAR_NUMBER * START_PAGE_BARS_NUMBER)
                .fill(0)
                .map(() => ({
                    selectedContexts: null,
                    selectedDimensions: null,
                    selectedFields: null
                }));
        }
    }, null
);