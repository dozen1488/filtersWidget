import React, { Component } from 'react'
import { SelectBase } from 'react-select';
import manageState from 'react-select/lib/stateManager';

import { hocSelectBaseModifier } from '../hocSelectBaseModifier';

const ModifiedSelectComponent = manageState(hocSelectBaseModifier(SelectBase));

class FilterComponent extends Component {
    render() {
        return (
            <ModifiedSelectComponent
                onChange={this.props.onChange}
                options={this.props.options}
                components={this.props.components}
                styles={this.props.styles}
                className={this.props.className}
                classNamePrefix={this.props.classNamePrefix}
                placeholder={this.props.placeholder}
            />
        );
    }
}

export default FilterComponent;