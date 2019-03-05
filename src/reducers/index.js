import thunk  from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import createPromise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import localforage from 'localforage';

import { validateBeforeDispatch } from '../helpers/helperFunctions';
import createLocalStorage, { defaultActions, actionTypes } from '../middlewares/localStorageMiddleware';
import initialStateValidationScheme from '../domain/validationSchemes/initialStateValidationScheme';

import rootReducer from './rootReducer';
import initialState from './initialState';

const storageActions = { ...defaultActions };
storageActions[actionTypes.LOCAL_GET] = {
    ...defaultActions[actionTypes.LOCAL_GET],
    success:validateBeforeDispatch.bind(null, initialStateValidationScheme)
};

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(
        thunk,
        createPromise({
            promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']
        }),
        createLocalStorage(
            localforage.createInstance({
                driver: localforage.LOCALSTORAGE,
                name: 'local'
            }),
            storageActions
        ),
        createLogger({
            stateTransformer: (state) => {
                if (Iterable.isIterable(state)) return state.toJS();
                else return state;
            }
        })
    )
)