import jest from 'jest-mock';

import * as actions from '../../actions';
import * as actionTypes from '../../actionTypes';  
import tablesRepository from '../../repositories/tablesRepository';

describe('actions', () => {
    it('workPanelActions should create proper objects', () => {
        const setSelectedContextsExpectedObject = {
            type: actionTypes.SET_SELECTED_CONTEXT,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        const setSelectedDimensionsExpectedObject = {
            type: actionTypes.SET_SELECTED_DIMENSION,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        const setSelectedFieldsExpectedObject = {
            type: actionTypes.SET_SELECTED_FIELDS,
            payload: {
                data: 2,
                panelIndex: 1
            }
        };
        expect(actions.setSelectedContexts(1, 2)).toEqual(setSelectedContextsExpectedObject);
        expect(actions.setSelectedDimensions(1, 2)).toEqual(setSelectedDimensionsExpectedObject);
        expect(actions.setSelectedFields(1, 2)).toEqual(setSelectedFieldsExpectedObject);
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