import { SET_SELECTED_CONTEXT } from '../actionTypes.json';

export default function setSelectedContext (context) {
    return {
        type: SET_SELECTED_CONTEXT,
        payload: context
    };
}

