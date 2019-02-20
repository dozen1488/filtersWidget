import { GET_TABLES, GET_DIMENSIONS, GET_FIELDS } from '../actionTypes.json';
import TablesRepository from '../../repositories/tablesRepository';

export function getTables () {
    return (dispatch) => {
        return dispatch({
            type: GET_TABLES,
            payload: TablesRepository.getTables()
        });
    }
}

export function getDimensions (contextId) {
    return (dispatch) => {
        return dispatch({
            type: GET_DIMENSIONS,
            payload: TablesRepository.getDimensions(contextId)
                .then(dimensions => ({ dimensions, contextId })),
        });
    }
}

export function getFields (contextId, dimensionName) {
    return (dispatch) => {
        return dispatch({
            type: GET_FIELDS,
            payload: TablesRepository.getFields(contextId, dimensionName)
                .then(fields => ({ fields, contextId, dimensionName })),
        });
    }
}
