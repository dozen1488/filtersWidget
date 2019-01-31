import React, { Component } from 'react'
import { SelectBase } from 'react-select';
import manageState from 'react-select/lib/stateManager';

import { hocSelectBaseModifier } from '../hocSelectBaseModifier';

const ModifiedSelectComponent = manageState(hocSelectBaseModifier(SelectBase));

class FilterComponent extends Component {
    render() {
        return (
            <ModifiedSelectComponent
                {...this.props}
            />
        );
    }
}

export default FilterComponent;