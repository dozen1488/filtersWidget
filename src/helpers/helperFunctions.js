import difference from 'lodash/difference';

export function sameValueFunction (value) {
    return value;
};

export function returnUndefinedFunction (value) {
    return undefined;
}

export function returnNullFunction (value) {
    return null;
}

export function returnFunctionEmptyString () {
    return '';
}

function isDifferentContexts(selectedIndexes, previousContexts, newContexts) {
    const selectedContextsIds = previousContexts
        // eslint-disable-next-line eqeqeq
        .filter((context, index) => selectedIndexes.find((selectedIndex) => selectedIndex == index))
        .map(context => context.id);
    const newContextsIds = newContexts.map(context => context.id);

    return difference(selectedContextsIds, newContextsIds).length;
}

export function checkConsistency (immutableState, actionValue) {
    const jsState = immutableState.toJS();

    const hasDeletedContext = isDifferentContexts(
        (actionValue && actionValue.workPanels.map(panel => panel.selectedContexts)) || [],
        (actionValue && actionValue.contexts) || [],
        jsState.contexts,
    );
    
    return hasDeletedContext;
}
