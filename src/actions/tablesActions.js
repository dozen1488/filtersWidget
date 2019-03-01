import { GET_TABLES, GET_DIMENSIONS, GET_FIELDS } from './actionTypes.json';
import TablesRepository from '../domain/repositories/tablesRepository';

export function getTables () {
    return (dispatch) => {
        return dispatch({
            type: GET_TABLES,
            payload: TablesRepository.getTables()
        });
    }
}

export function getDimensions (panelIndex, contextId) {
    return (dispatch) => {
        return dispatch({
            type: GET_DIMENSIONS,
            panelIndex,
            payload: TablesRepository.getDimensions(contextId)
                .then(dimensions => ({ dimensions, panelIndex, contextId })),
        });
    }
}

export function getFields (panelIndex, contextId, dimensionName) {
    return (dispatch) => {
        return dispatch({
            type: GET_FIELDS,
            panelIndex,
            payload: TablesRepository.getFields(contextId, dimensionName)
                .then(fields => ({ fields, panelIndex, contextId, dimensionName })),
        });
    }
}
