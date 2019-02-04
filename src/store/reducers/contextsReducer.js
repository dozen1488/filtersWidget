import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { GET_TABLES_SUCCESS, GET_SESSION_SUCCESS } from '../actionTypes.json';

export default handleActions({
        [GET_TABLES_SUCCESS]: (state, action) => {
            return fromJS(action.payload);
        },
        [GET_SESSION_SUCCESS]: (state, { value }) => {
            return fromJS(value.contexts);
        }
    }, null
);