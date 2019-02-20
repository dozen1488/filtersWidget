import _ from 'lodash'
import localforage from 'localforage'
import { sameValueFunction } from '../../helpers/helperFunctions';

import * as actionTypes from './action_types'

const defaultActions = {
    [actionTypes.LOCAL_SET]: {
        request: sameValueFunction,
        error: sameValueFunction,
        success: sameValueFunction
    },
    [actionTypes.LOCAL_GET]: {
        request: sameValueFunction,
        error: sameValueFunction,
        success: sameValueFunction
    },
    [actionTypes.LOCAL_REMOVE]: {
        request: sameValueFunction,
        error: sameValueFunction,
        success: sameValueFunction
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

        const [, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/);

        switch (type) {
            case actionTypes.LOCAL_SET:
                coerceArray(action.request).map(requestAction => {
                    store.dispatch(
                        actions[actionTypes.LOCAL_SET].request({
                            type: withNamespace(namespace, requestAction),
                            key: action.key,
                            value: action.value
                        })
                    )
                });

                return client.setItem(action.key, action.value, (err, value) => {

                    if (err) {
                        coerceArray(action.failure).map(failureAction => {
                            store.dispatch(
                                actions[actionTypes.LOCAL_SET].failure({
                                    type: withNamespace(namespace, failureAction),
                                    err
                                })
                            )
                        })
                    }

                    coerceArray(action.success).map(successAction => {
                        store.dispatch(
                            actions[actionTypes.LOCAL_SET].success({
                                type: withNamespace(namespace, successAction),
                                value
                            })
                        )
                    })

                });

            case actionTypes.LOCAL_GET:

                coerceArray(action.request).map(requestAction => {
                    store.dispatch(
                        actions[actionTypes.LOCAL_GET].request({
                            type: withNamespace(namespace, requestAction),
                            key: action.key
                        })
                    );
                });

                return client.getItem(action.key, (err, value) => {

                    if (err) {
                        coerceArray(action.failure).map(failureAction => {
                            store.dispatch(
                                actions[actionTypes.LOCAL_GET].failure({
                                    type: withNamespace(namespace, failureAction),
                                    err
                                })
                            )
                        })
                    }

                    coerceArray(action.success).map(successAction => {
                        store.dispatch(
                            actions[actionTypes.LOCAL_GET].success({
                                type: withNamespace(namespace, successAction),
                                value
                            })
                        )
                    })

                });

            case actionTypes.LOCAL_REMOVE:

                coerceArray(action.request).map(requestAction => {
                    store.dispatch(
                        actions[actionTypes.LOCAL_REMOVE].request({
                            type: withNamespace(namespace, requestAction),
                            key: action.key
                        })
                    )
                });

                return client.removeItem(action.key, (err, value) => {

                    if (err) {
                        coerceArray(action.failure).map(failureAction => {
                            store.dispatch(
                                actions[actionTypes.LOCAL_REMOVE].failure({
                                    type: withNamespace(namespace, failureAction),
                                    err
                                })
                            )
                        })
                    }

                    coerceArray(action.success).map(successAction => {
                        store.dispatch(
                            actions[actionTypes.LOCAL_REMOVE].success({
                                type: withNamespace(namespace, successAction)
                            })
                        )
                    })

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