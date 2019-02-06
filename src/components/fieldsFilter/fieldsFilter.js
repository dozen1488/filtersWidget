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

        this.filters = {
            [filterStateEnum.FULL]: (option, rawInput) => (!rawInput) || (option.label === rawInput),
            [filterStateEnum.PARTIAL]: (option, rawInput) => option.label.indexOf(rawInput) !== -1,
            'default': (option, rawInput) => option.label.indexOf(rawInput) === 0
        }
        this.onFilterCheckboxSelect = this.onFilterCheckboxSelect.bind(this);
        this.componentsObject = {
            DropdownIndicator: MagnifierIndicator,
            Control: FieldsFiltersControl
        }
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
        return this.filters[this.state.fieldsFilterName] || this.filters.default;
    }

    render() {
        let components = this.props.components;
        if (!components) {
            components = this.componentsObject;
        } else {
            components.DropdownIndicator = MagnifierIndicator;
            components.Control = FieldsFiltersControl;
        }

        return (
            <ModifiedSelectComponent
                {...this.props}
                isSearchable
                fieldsFilterName={this.state.fieldsFilterName}
                filterOption={this.getFilterFunction()}
                onFilterCheckboxSelect={this.onFilterCheckboxSelect}
                components={components}
            />
        );
    }
}

export default FieldsFilter;