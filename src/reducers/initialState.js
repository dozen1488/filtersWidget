import { fromJS } from 'immutable';
import { START_PAGE_BARS_NUMBER, START_PAGE_PANELS_IN_BAR_NUMBER } from '../constants/config';

export default fromJS({
    workPanels: new Array(START_PAGE_PANELS_IN_BAR_NUMBER * START_PAGE_BARS_NUMBER)
        .fill(0)
        .map(() => ({
            contexts: null,
            workPanel: {
                selectedContexts: [],
                selectedDimensions: [],
                selectedFields: []
            }
        }))
});