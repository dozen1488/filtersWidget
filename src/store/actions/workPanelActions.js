import { SET_SELECTED_CONTEXT, SET_SELECTED_DIMENSION, SET_SELECTED_FIELDS } from '../actionTypes.json';

export function setSelectedContext (panelIndex, data) {
    return {
        type: SET_SELECTED_CONTEXT,
        payload: {
            data,
            panelIndex
        }
    };
}

export function setDimensionsContext (panelIndex, data) {
    return {
        type: SET_SELECTED_DIMENSION,
        payload: {
            data,
            panelIndex
        }
    };
}

export function setFieldsContext (panelIndex, data) {
    return {
        type: SET_SELECTED_FIELDS,
        payload: {
            data,
            panelIndex
        }
    };
}
