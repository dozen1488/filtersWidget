import React, { PureComponent } from 'react'
import { SelectBase } from 'react-select';
import manageState from 'react-select/lib/stateManager';

import { hocSelectBaseModifier } from '../hocSelectBaseModifier';

const ModifiedSelectComponent = manageState(hocSelectBaseModifier(SelectBase));

class FilterComponent extends PureComponent {
    render() {
        return (
            <ModifiedSelectComponent
                {...this.props}
            />
        );
    }
}

export default FilterComponent;