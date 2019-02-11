import jest from 'jest-mock';

import * as actions from '../../store/actions';
import * as actionTypes from '../../store/actionTypes';  
import tablesRepository from '../../repositories/tablesRepository';

describe('actions', () => {
    it('workPanelActions should create proper objects', () => {
        const setSelectedContextExpectedObject = {
            type: actionTypes.SET_SELECTED_CONTEXT,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        const setDimensionsContextExpectedObject = {
            type: actionTypes.SET_SELECTED_DIMENSION,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        const setFieldsContextExpectedObject = {
            type: actionTypes.SET_SELECTED_FIELDS,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        expect(actions.setSelectedContext(1, 2)).toEqual(setSelectedContextExpectedObject);
        expect(actions.setDimensionsContext(1, 2)).toEqual(setDimensionsContextExpectedObject);
        expect(actions.setFieldsContext(1, 2)).toEqual(setFieldsContextExpectedObject);
    });
    it('storageActions should create proper objects', () => {
        const value = 'test';

        const getSessionExpectedObject = {
            type: 'LOCAL_GET',
            key: 'session',
            request: actionTypes.GET_SESSION_REQUEST,
            success: actionTypes.GET_SESSION_SUCCESS,
            failure: actionTypes.GET_SESSION_FAILURE
        };

        const setSessionExpectedObject = {
            type: 'LOCAL_SET',
            key: 'session',
            value,
            request: actionTypes.SET_SESSION_REQUEST,
            success: actionTypes.SET_SESSION_SUCCESS,
            failure: actionTypes.SET_SESSION_FAILURE
        };

        const removeSessionExpectedObject = {
            type: 'LOCAL_REMOVE',
            key: 'session',
            request: actionTypes.REMOVE_SESSION_REQUEST,
            success: actionTypes.REMOVE_SESSION_SUCCESS,
            failure: actionTypes.REMOVE_SESSION_FAILURE
        };

        expect(actions.getSession()).toEqual(getSessionExpectedObject);
        expect(actions.setSession(value)).toEqual(setSessionExpectedObject);
        expect(actions.removeSession()).toEqual(removeSessionExpectedObject);
    });

    it('', () => {
        tablesRepository.getTables = jest.fn(() => 'Contexts');
        const dispatchMock = jest.fn();

        actions.getTables()(dispatchMock);
    
        expect(dispatchMock.mock.calls[0][0]).toEqual({
            type: actionTypes.GET_TABLES,
            payload: 'Contexts'
        })
    });
})