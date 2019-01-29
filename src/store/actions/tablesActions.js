import { GET_TABLES } from '../actionTypes.json';
import TablesRepository from '../../repositories/tablesRepository';

export default function getTables () {
    return (dispatch) => {
        dispatch({
            type: GET_TABLES,
            payload: TablesRepository.getTables()
        });
    }
}

