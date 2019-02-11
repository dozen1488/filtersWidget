import { fromJS } from 'immutable';

import contextsReducer from '../../store/reducers/contextsReducer';
import workPanelsReducer from '../../store/reducers/workPanelsReducer';

import {
    GET_TABLES_SUCCESS,
    GET_SESSION_SUCCESS,
    SET_SELECTED_CONTEXT,
    SET_SELECTED_DIMENSION,
    SET_SELECTED_FIELDS
} from '../../store/actionTypes';

describe('reducers', () => {
    it('contextsReducer should return proper state on GET_TABLES_SUCCESS and GET_SESSION_SUCCESS', () => {
        const action = {
            type: GET_TABLES_SUCCESS,
            payload: [
                {
                    "dimensions": [
                        {
                            "fields": [
                                "Dimension1",
                                "Dimension2",
                            ],
                            "dimensionName": "Table one"
                        }
                    ],
                    "name": "First Context",
                    "id": "1"
                }
            ]
        };
        expect(contextsReducer(null, action).toJS()).toEqual(action.payload);

        action.type = GET_SESSION_SUCCESS;
        action.value = {
            contexts: action.payload
        };

        expect(contextsReducer(null, action).toJS()).toEqual(action.payload);
    });

    it('workPanelsReducer should return proper state on SET_SELECTED_CONTEXT', () => {
        const action = {
            type: SET_SELECTED_CONTEXT,
            payload: {
                panelIndex: 0,
                data: 2
            }
        };
        const state = [{
            selectedContextIndex: 1,
            selectedDimensionIndex: 1,
            selectedFields: ['a']
        }];
        const expectedState = [{
            selectedContextIndex: 2,
            selectedDimensionIndex: null,
            selectedFields: []
        }]

        expect(workPanelsReducer(fromJS(state), action).toJS()).toEqual(expectedState);
    });

    it('workPanelsReducer should return proper state on SET_SELECTED_DIMENSION and SET_SELECTED_FIELDS', () => {
        const action = {
            type: SET_SELECTED_DIMENSION,
            payload: {
                panelIndex: 0,
                data: 2
            }
        };
        const state = [{
            selectedContextIndex: 1,
            selectedDimensionIndex: 1,
            selectedFields: ['a']
        }];
        const expectedState = [{
            selectedContextIndex: 1,
            selectedDimensionIndex: 2,
            selectedFields: []
        }]

        expect(workPanelsReducer(fromJS(state), action).toJS()).toEqual(expectedState);
    });

    it('workPanelsReducer should return proper state on SET_SELECTED_FIELDS', () => {
        const action = {
            type: SET_SELECTED_FIELDS,
            payload: {
                panelIndex: 0,
                data: ['a', 'b']
            }
        };
        const state = [{
            selectedContextIndex: 1,
            selectedDimensionIndex: 1,
            selectedFields: ['a']
        }];
        const expectedState = [{
            selectedContextIndex: 1,
            selectedDimensionIndex: 1,
            selectedFields: ['a', 'b']
        }]

        expect(workPanelsReducer(fromJS(state), action).toJS()).toEqual(expectedState);
    });
    it('workPanelsReducer should return proper state on GET_SESSION_SUCCESS', () => {
        const action = {
            type: GET_SESSION_SUCCESS,
            value: {
                workPanels: [{
                    selectedContextIndex: 1,
                    selectedDimensionIndex: 1,
                    selectedFields: ['a', 'b']
                }]
            }
        };

        expect(workPanelsReducer(null, action).toJS()).toEqual(action.value.workPanels);
    });
});