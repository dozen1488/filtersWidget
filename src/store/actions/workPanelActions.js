import { SET_SELECTED_CONTEXT, SET_SELECTED_DIMENSION, SET_SELECTED_FIELDS } from '../actionTypes.json';

export function setSelectedContext (panelIndex, data) {
    return {
        type: SET_SELECTED_CONTEXT,
        panelIndex,
        payload: {
            data
        }
    };
}

export function setDimensionsContext (panelIndex, data) {
    return {
        type: SET_SELECTED_DIMENSION,
        panelIndex,
        payload: {
            data
        }
    };
}

export function setFieldsContext (panelIndex, data) {
    return {
        type: SET_SELECTED_FIELDS,
        panelIndex,
        payload: {
            data
        }
    };
}
