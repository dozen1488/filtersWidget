import { SET_SELECTED_CONTEXT, SET_SELECTED_DIMENSION, SET_SELECTED_FIELDS } from '../actionTypes.json';

export function setSelectedContexts (panelIndex, data) {
    return {
        type: SET_SELECTED_CONTEXT,
        panelIndex,
        payload: {
            data: data.map(el => el.serialize())
        }
    };
}

export function setSelectedDimensions (panelIndex, data) {
    return {
        type: SET_SELECTED_DIMENSION,
        panelIndex,
        payload: {
            data: data.map(el => el.serialize())
        }
    };
}

export function setSelectedFields (panelIndex, data) {
    return {
        type: SET_SELECTED_FIELDS,
        panelIndex,
        payload: {
            data: data.map(el => el.serialize())
        }
    };
}
