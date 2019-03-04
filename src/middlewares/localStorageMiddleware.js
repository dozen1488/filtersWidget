import _ from 'lodash'
import localforage from 'localforage'

import initialStateValidationScheme from '../domain/validationSchemes/initialStateValidationScheme';

import * as actionTypes from './action_types'

function defaultFunction (data, getState, dispatch) {
    return dispatch(data);
} 

export const defaultActions = {
    [actionTypes.LOCAL_SET]: {
        request: defaultFunction,
        error: defaultFunction,
        success: defaultFunction
    },
    [actionTypes.LOCAL_GET]: {
        request: defaultFunction,
        error: defaultFunction,
        success: (data, getState, dispatch) => {
            if (!initialStateValidationScheme.validate(data.value).error) return dispatch(data);
        }
    },
    [actionTypes.LOCAL_REMOVE]: {
        request: defaultFunction,
        error: defaultFunction,
        success: defaultFunction
    }
};

export default (
    client = localforage.createInstance({
        name: 'local',
        storeName: 'cache'
    }),
    actions = defaultActions
) => {
    return store => next => action => {
        const [, namespace, type] = action.type.match(/([-z0-9_]*)?\/?([A-Z0-9_]*)/);

        switch (type) {
            case actionTypes.LOCAL_SET:
                coerceArray(action.request).map(requestAction =>
                    actions[actionTypes.LOCAL_SET].request(
                        {
                            type: withNamespace(namespace, requestAction),
                            key: action.key,
                            value: action.value
                        },
                        store.getState,
                        store.dispatch
                    ));

                return client.setItem(action.key, action.value, (err, value) => {
                    if (err) {
                        coerceArray(action.failure).map(failureAction =>
                            actions[actionTypes.LOCAL_SET].failure(
                                {
                                    type: withNamespace(namespace, failureAction),
                                    err
                                },
                                store.getState,
                                store.dispatch
                            ))
                    }

                    coerceArray(action.success).map(successAction =>
                        actions[actionTypes.LOCAL_SET].success(
                            {
                                type: withNamespace(namespace, successAction),
                                value
                            },
                            store.getState,
                            store.dispatch
                        ))
                });

            case actionTypes.LOCAL_GET:

                coerceArray(action.request).map(requestAction =>
                    actions[actionTypes.LOCAL_GET].request(
                        {
                            type: withNamespace(namespace, requestAction),
                            key: action.key
                        },
                        store.getState,
                        store.dispatch
                    ));

                return client.getItem(action.key, (err, value) => {

                    if (err) {
                        coerceArray(action.failure).map(failureAction =>
                            actions[actionTypes.LOCAL_GET].failure(
                                {
                                    type: withNamespace(namespace, failureAction),
                                    err
                                },
                                store.getState,
                                store.dispatch
                            ))
                    }

                    coerceArray(action.success).map(successAction =>
                        actions[actionTypes.LOCAL_GET].success(
                            {
                                type: withNamespace(namespace, successAction),
                                value
                            },
                            store.getState,
                            store.dispatch
                        ))

                });

            case actionTypes.LOCAL_REMOVE:

                coerceArray(action.request).map(requestAction =>
                    actions[actionTypes.LOCAL_REMOVE].request(
                        {
                            type: withNamespace(namespace, requestAction),
                            key: action.key
                        },
                        store.getState,
                        store.dispatch
                    ));

                return client.removeItem(action.key, (err, value) => {

                    if (err) {
                        coerceArray(action.failure).map(failureAction =>
                            actions[actionTypes.LOCAL_REMOVE].failure(
                                {
                                    type: withNamespace(namespace, failureAction),
                                    err
                                },
                                store.getState,
                                store.dispatch
                            ))
                    }

                    coerceArray(action.success).map(successAction =>
                        actions[actionTypes.LOCAL_REMOVE].success(
                            {
                                type: withNamespace(namespace, successAction)
                            },
                            store.getState,
                            store.dispatch
                        ))

                });

            default:
                return next(action);
        }
    }

}

const coerceArray = (value) => {
    return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
    return namespace ? `${namespace}/${type}` : type
}