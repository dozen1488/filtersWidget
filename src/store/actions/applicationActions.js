import {
    getDimensions,
    getFields
} from './tablesActions';
import {
    setSelectedContext,
    setDimensionsContext
} from './workPanelActions';

export {
    getTables,
    getDimensions
} from './tablesActions';
export {
    setSelectedContext,
    setDimensionsContext,
    setFieldsContext
} from './workPanelActions';
export {
    getSession,
    setSession,
    removeSession
} from './storageActions';

export function selectContext(panelIndex, contextIndex) {
    return (dispatchEvent, getState) => {
        dispatchEvent(setSelectedContext(panelIndex, contextIndex));

        const contextId = getState().get('contexts').get(contextIndex).get('id');

        return dispatchEvent(getDimensions(contextId));
    }
}

export function selectDimension(panelIndex, dimensionIndex) {
    return (dispatchEvent, getState) => {
        dispatchEvent(setDimensionsContext(panelIndex, dimensionIndex));

        const selectedContextIndex = getState().get('workPanels').get(panelIndex).get('selectedContextIndex');
        const context =  getState().getIn(['contexts', selectedContextIndex]);
        const dimensionName = context.getIn(['dimensions', dimensionIndex, 'dimensionName']);

        return dispatchEvent(getFields(context.get('id'), dimensionName));
    }
}