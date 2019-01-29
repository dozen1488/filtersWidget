import React from 'react';
import ReactDOM from 'react-dom';
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer';
import initialState from './store/initialState';

ReactDOM.render(
    <Provider store={
        createStore(
            rootReducer,
            initialState,
            applyMiddleware(
                thunk,
                createLogger()
            )
        )
    }>
       <App /> 
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
