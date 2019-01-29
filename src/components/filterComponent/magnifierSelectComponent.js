import React from 'react'
import { SelectBase } from 'react-select';

import manageState from 'react-select/lib/stateManager';

import ControlWithCheckboxes from './components/controlWithCheckboxes';
import MagnifierIndicator from './components/magnifierIndicator';

import filterStateEnum from './components/filterStateEnum';

import modifier from './indicatorSelectModifier';

class ModifiedGetCommonProps extends modifier(SelectBase) {
    getCommonProps() {
        const commonProps = super.getCommonProps();
        return {
            ...commonProps,
            onFilterCheckboxSelect: this.props.onFilterCheckboxSelect,
            fieldsFilterName: this.props.fieldsFilterName
        }
    }
}

const ModifiedSelectComponent = manageState(ModifiedGetCommonProps);

class MagnifierSelectComponent extends ModifiedSelectComponent {
    constructor(...args) {
        super(...args);
        this.state.fieldsFilterName = filterStateEnum.STARTS_WITH;
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
                return (option, rawInput) => option.label === rawInput;
            case filterStateEnum.PARTIAL:
                return (option, rawInput) => option.label.indexOf(rawInput) !== -1;
            default: 
                return (option, rawInput) => option.label.indexOf(rawInput) === 0;
        }
    }

    render() {
        const components = this.props.components;
        components.DropdownIndicator = MagnifierIndicator;
        components.Control = ControlWithCheckboxes;

        return (
            <ModifiedSelectComponent
                {...this.props}
                fieldsFilterName={this.state.fieldsFilterName}
                filterOption={this.getFilterFunction()}
                onFilterCheckboxSelect={this.onFilterCheckboxSelect.bind(this)}
                components={components}
            />
        );
    }
}

export default MagnifierSelectComponent;