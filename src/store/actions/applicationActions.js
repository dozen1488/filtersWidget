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

        const contextId = getState()
            .get('workPanels')
            .get(panelIndex)
            .get('contexts')
            .get(contextIndex)
            .get('id');

        return dispatchEvent(getDimensions(panelIndex, contextId));
    }
}

export function selectDimension(panelIndex, dimensionIndex) {
    return (dispatchEvent, getState) => {
        dispatchEvent(setDimensionsContext(panelIndex, dimensionIndex));
        const panel = getState()
            .get('workPanels')
            .get(panelIndex);

        const selectedContextIndex = panel
            .get('workPanel')
            .get('selectedContextIndex');
        const context = panel
            .get('contexts')
            .get(selectedContextIndex);

        const dimensionName = context.getIn(['dimensions', dimensionIndex, 'dimensionName']);

        return dispatchEvent(getFields(panelIndex, context.get('id'), dimensionName));
    }
}