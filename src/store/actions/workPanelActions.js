import { SET_SELECTED_CONTEXT, SET_DIMENSIONS_CONTEXT, SET_SELECTED_FIELDS } from '../actionTypes.json';

export function setSelectedContext (data, panelIndex) {
    return {
        type: SET_SELECTED_CONTEXT,
        payload: {
            data,
            panelIndex
        }
    };
}

export function setDimensionsContext (data, panelIndex) {
    return {
        type: SET_DIMENSIONS_CONTEXT,
        payload: {
            data,
            panelIndex
        }
    };
}

export function setFieldsContext (data, panelIndex) {
    return {
        type: SET_SELECTED_FIELDS,
        payload: {
            data,
            panelIndex
        }
    };
}
