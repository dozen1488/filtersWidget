import {
    GET_SESSION_REQUEST,
    GET_SESSION_SUCCESS,
    GET_SESSION_FAILURE,
    SET_SESSION_REQUEST,
    SET_SESSION_SUCCESS,
    SET_SESSION_FAILURE,
    REMOVE_SESSION_REQUEST,
    REMOVE_SESSION_SUCCESS,
    REMOVE_SESSION_FAILURE
} from './actionTypes';

export const getSession = () => ({
    type: 'LOCAL_GET',
    key: 'session',
    request: GET_SESSION_REQUEST,
    success: GET_SESSION_SUCCESS,
    failure: GET_SESSION_FAILURE
})

export const setSession = (value) => ({
    type: 'LOCAL_SET',
    key: 'session',
    value,
    request: SET_SESSION_REQUEST,
    success: SET_SESSION_SUCCESS,
    failure: SET_SESSION_FAILURE
})

export const removeSession = () => ({
    type: 'LOCAL_REMOVE',
    key: 'session',
    request: REMOVE_SESSION_REQUEST,
    success: REMOVE_SESSION_SUCCESS,
    failure: REMOVE_SESSION_FAILURE
})