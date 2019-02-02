//export { default as FiltersWidget } from './filtersWidget';
import stateManager from './stateManager';
import FiltersWidgetStateless from './filtersWidget';

const widget = stateManager(FiltersWidgetStateless);

export { widget as FiltersWidget };