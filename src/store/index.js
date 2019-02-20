import thunk  from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import createPromise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import createLocalStorage from './middlewares/localStorageMiddleware';
import localforage from 'localforage';

import rootReducer from './reducers/rootReducer';
import initialState from './initialState';

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
            })
        ),
        createLogger({
            stateTransformer: (state) => {
                if (Iterable.isIterable(state)) return state.toJS();
                else return state;
            }
        })
    )
)