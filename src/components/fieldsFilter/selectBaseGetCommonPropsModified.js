import { SelectBase } from 'react-select';

import { hocSelectBaseModifier } from '../hocSelectBaseModifier';

const ModifiedSelectClass = hocSelectBaseModifier(SelectBase);

export default class ModifiedGetCommonProps extends ModifiedSelectClass {
    getCommonProps() {
        const commonProps = super.getCommonProps();
        return {
            ...commonProps,
            onFilterCheckboxSelect: this.props.onFilterCheckboxSelect,
            fieldsFilterName: this.props.fieldsFilterName
        }
    }
}