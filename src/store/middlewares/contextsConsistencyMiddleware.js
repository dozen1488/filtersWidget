import difference from 'lodash/difference';

import { GET_SESSION_SUCCESS, RESET_WORKPANELS } from '../actionTypes';

function isDifferentContexts(selectedIndexes, previousContexts, newContexts) {
    const selectedContextsIds = previousContexts
        .filter((context, index) => selectedIndexes.find((selectedIndex) => selectedIndex == index))
        .map(context => context.id);
    const newContextsIds = newContexts.map(context => context.id);

    return difference(selectedContextsIds, newContextsIds).length;
}

function createConsistencyMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if(action.type === GET_SESSION_SUCCESS) {
            const state = getState().toJS();
            const hasDeletedContext = isDifferentContexts(
                state.workPanels.map(panel => panel.selectedContextIndex),
                action.value.contexts,
                state.contexts,
            );

            if(hasDeletedContext) {
                return dispatch({
                    type: RESET_WORKPANELS
                });
            }
        }
        return next(action);
    };
}

export default createConsistencyMiddleware();