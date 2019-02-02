//export { default as FiltersWidget } from './filtersWidget';
import stateManager from './stateManager';
import FiltersWidgetStateless from './filtersWidgetStateless';

const widget = stateManager(FiltersWidgetStateless);

export { widget as FiltersWidget };