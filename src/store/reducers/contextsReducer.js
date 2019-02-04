import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { GET_TABLES_SUCCESS } from '../actionTypes.json';

export default handleActions({
        [GET_TABLES_SUCCESS]: (state, action) => {
            return fromJS(action.payload);
        }
    }, null
);