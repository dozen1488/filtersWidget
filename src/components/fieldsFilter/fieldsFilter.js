import React from 'react'

import MagnifierIndicator from './components/magnifierIndicator';

import { filterStateEnum } from '../fieldsFiltersBar';

import { FieldsFiltersControl } from '../fieldsFiltersControl';
import Select from '../reactSelectWithExtendedDefaultProps';

class FieldsFilter extends React.PureComponent {
    constructor(...args) {
        super(...args);

        this.filters = {
            [filterStateEnum.FULL]: (option, rawInput) => (!rawInput) || (option.label === rawInput),
            [filterStateEnum.PARTIAL]: (option, rawInput) => option.label.indexOf(rawInput) !== -1,
            'default': (option, rawInput) => option.label.indexOf(rawInput) === 0
        };
        this.componentsObject = {
            DropdownIndicator: MagnifierIndicator,
            Control: FieldsFiltersControl
        };
        this.onFilterCheckboxSelect = this.onFilterCheckboxSelect.bind(this);
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
            <Select
                {...this.props}
                isSearchable
                autoFocus
                filterOption={this.getFilterFunction()}
                components={components}
                onFilterCheckboxSelect={this.onFilterCheckboxSelect}
                fieldsFilterName={this.state.fieldsFilterName}
            />
        );
    }
}

FieldsFilter.propTypes = Select.propTypes;

FieldsFilter.defaultProps = Select.defaultProps;

export default FieldsFilter;