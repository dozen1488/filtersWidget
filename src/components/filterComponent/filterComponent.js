import React, { Component } from 'react'
import propTypes from 'prop-types';
import { SelectBase } from 'react-select';
import manageState from 'react-select/lib/stateManager';

import modifier from './indicatorSelectModifier';

const ModifiedSelectComponent = manageState(modifier(SelectBase));

class FilterComponent extends Component {
    render() {
        return (
            <ModifiedSelectComponent
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