import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { SET_SELECTED_CONTEXT } from '../actionTypes.json';

export default handleActions({
        [SET_SELECTED_CONTEXT]: (state, action) => {
            return fromJS(action.payload);
        }
    }, null
);