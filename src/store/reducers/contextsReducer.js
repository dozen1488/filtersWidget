import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { GET_TABLES_SUCCESS, GET_SESSION_SUCCESS, GET_DIMENSIONS_SUCCESS, GET_FIELDS_SUCCESS } from '../actionTypes.json';

export default handleActions({
        [GET_TABLES_SUCCESS]: (state, action) => {
            return fromJS(action.payload);
        },
        [GET_SESSION_SUCCESS]: (state, { value }) => {
            return (value && value.contexts) ? fromJS(value.contexts) : state;
        },
        [GET_DIMENSIONS_SUCCESS]: (state, { payload: { dimensions, contextId } }) => {
            return state.map(context => {
                // eslint-disable-next-line eqeqeq
                if (context.get('id') != contextId) return context;
                return context.set('dimensions', fromJS(dimensions));
            });
        },
        [GET_FIELDS_SUCCESS]: (state, { payload: { contextId, dimensionName, fields } }) => {
            return state.map(context => {
                // eslint-disable-next-line eqeqeq
                if (context.get('id') != contextId) return context;
                const dimensions = context.get('dimensions').map(
                    dimension => {
                        // eslint-disable-next-line eqeqeq
                        if (dimension.get('dimensionName') != dimensionName) return dimension;
                        return dimension.set('fields', fromJS(fields));
                    }
                )
                return context.set('dimensions', dimensions);
            });
        }
    }, null
);