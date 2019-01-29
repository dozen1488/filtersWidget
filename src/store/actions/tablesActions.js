import { GET_TABLES } from '../actionTypes.json';
import TablesRepository from '../../repositories/tablesRepository';

export default function getTables () {
    return (dispatch) => {
        return TablesRepository.getTables()
            .then(json => {
                dispatch({
                    type: GET_TABLES,
                    payload: json
                })
            });
    }
}

