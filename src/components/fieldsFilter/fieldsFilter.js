import React from 'react'

import manageState from 'react-select/lib/stateManager';

import { FieldsFiltersControl } from '../fieldsFiltersControl';
import MagnifierIndicator from './components/magnifierIndicator';

import { filterStateEnum } from '../fieldsFiltersBar';
import ModifiedPropsMethods from './selectBaseModifiedPropsMethods';

const ModifiedSelectComponent = manageState(ModifiedPropsMethods);

class FieldsFilter extends React.PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {
            fieldsFilterName: filterStateEnum.STARTS_WITH
        };
    }

    onFilterCheckboxSelect(filterName) {
        this.setState(
            (prevState) => {
                if (prevState.fieldsFilterName === filterName)
                    return { fieldsFilterName: filterStateEnum.STARTS_WITH };
                else 
                    return { fieldsFilterName: filterName };
            }
        );
    }

    getFilterFunction() {
        switch(this.state.fieldsFilterName) {
            case filterStateEnum.FULL:
                return (option, rawInput) => (!rawInput) || (option.label === rawInput);
            case filterStateEnum.PARTIAL:
                return (option, rawInput) => option.label.indexOf(rawInput) !== -1;
            default: 
                return (option, rawInput) => option.label.indexOf(rawInput) === 0;
        }
    }

    render() {
        const components = this.props.components || {};
        components.DropdownIndicator = MagnifierIndicator;
        components.Control = FieldsFiltersControl;

        return (
            <ModifiedSelectComponent
                {...this.props}
                isSearchable
                fieldsFilterName={this.state.fieldsFilterName}
                filterOption={this.getFilterFunction()}
                onFilterCheckboxSelect={this.onFilterCheckboxSelect.bind(this)}
                components={components}
            />
        );
    }
}

export default FieldsFilter;