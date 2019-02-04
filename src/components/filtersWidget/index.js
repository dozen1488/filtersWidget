//export { default as FiltersWidget } from './filtersWidget';
import stateManager from './stateManager';
import FiltersWidgetStateless from './filtersWidget';

const widget = stateManager(FiltersWidgetStateless);

export default widget;
export { FiltersWidgetStateless as FiltersWidget };