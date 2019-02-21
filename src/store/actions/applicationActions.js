import {
    getDimensions,
    getFields
} from './tablesActions';
import {
    setSelectedContexts,
    setSelectedDimensions
} from './workPanelActions';

export {
    getTables,
    getDimensions
} from './tablesActions';
export {
    setSelectedContexts,
    setSelectedDimensions,
    setSelectedFields
} from './workPanelActions';
export {
    getSession,
    setSession,
    removeSession
} from './storageActions';

export function selectContext(panelIndex, context) {
    return (dispatchEvent) => {
        return dispatchEvent(getDimensions(panelIndex, context.id));
    }
}

export function selectDimension(panelIndex, dimension) {
    return (dispatchEvent) => {
        return dispatchEvent(getFields(panelIndex, dimension.parentContext.id, dimension.dimensionName));
    }
}