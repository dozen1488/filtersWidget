import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { OptionComponent } from '../optionComponent';
import { FilterComponent, MagnifierSelectComponent } from '../filterComponent';
import userMessages from '../../constants/userMessages';

import './filtersWidget.less';

export default class FiltersWidget extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            selectedContext: null,
            selectedDimension: null
        };
    }

    onContextChange(data) {
        if (this.props.setSelectedContext) this.props.setSelectedContext(data.value);

        this.setState({
            selectedContext: data.value
        });
    }

    onDimensionChange(data) {
        if (this.props.setDimensionContext) this.props.setDimensionContext(data.value);

        this.setState({
            selectedDimension: data.value
        });
    }

    getContextOptions() {
        const contexts = (this.props.contexts)
            ? this.props.contexts
            : Immutable.List([]);

        return contexts.toJS();
    }

    getDimensionsOptions() {
        const dimensions = (this.state.selectedContext)
            ? this.state.selectedContext.dimensions
            : [];
        
        return dimensions;
    }

    getFiltersOptions() {
        const fields = (this.state.selectedDimension)
            ? this.state.selectedDimension.fields
            : [];
        
        return fields;
    }

    getEmptyStyles() {
        return {
            clearIndicator:() => {},
            container:() => {},
            control:() => {},
            dropdownIndicator:() => {},
            group:() => {},
            groupHeading:() => {},
            indicatorsContainer:() => {},
            indicatorSeparator:() => {},
            input:() => {},
            loadingIndicator:() => {},
            loadingMessageCSS:() => {},
            menu:() => {},
            menuList:() => {},
            menuPortal:() => {},
            multiValue:() => {},
            multiValueLabel:() => {},
            multiValueRemove:() => {},
            noOptionsMessageCSS:() => {},
            option:() => {},
            placeholder:() => {},
            singleValue:() => {},
            valueContainer: () => {},
        };
    }

    onFilterCheckboxSelect(filterName) {
        this.setState({
            fieldsFilterName: filterName
        });
    }

    render() {
        return (
            <div className="filtersWidget">
                <div className='filtersWidget__header'>
                    <p className='filtersWidget__header-text'>
                        {userMessages["filtersWidget.header.filters"]}
                    </p>
                </div>
                <div className="filtersWidget__line-container">
                    <FilterComponent
                        onChange={this.onContextChange.bind(this)}
                        options={this.getContextOptions()}
                        className={'filtersWidget__container'}
                        classNamePrefix={'filtersWidget'}
                        components={{ Option: OptionComponent }}
                        styles={this.getEmptyStyles()}
                        placeholder={userMessages["filtersWidget.placeholder.context"]}
                    />
                </div>
                <div className="filtersWidget__line-container">
                    <FilterComponent
                        components={{ Option: OptionComponent }}
                        onChange={this.onDimensionChange.bind(this)}
                        options={this.getDimensionsOptions()}
                        className={'filtersWidget__container'}
                        classNamePrefix={'filtersWidget'}
                        styles={this.getEmptyStyles()}
                        placeholder={userMessages["filtersWidget.placeholder.dimensions"]}
                    />
                </div>
                <div className="filtersWidget__line-container">
                    <MagnifierSelectComponent
                        isMulti
                        menuIsOpen
                        noOptionsMessage={() => ''}
                        controlShouldRenderValue={false}
                        hideSelectedOptions={false}
                        components={{
                            Option: OptionComponent,
                            MultiValue: () => null,
                            ClearIndicator: () => null
                        }}
                        options={this.getFiltersOptions()}
                        className={'filtersWidget__container filtersWidgetField'}
                        classNamePrefix={'filtersWidget'}
                        styles={this.getEmptyStyles()}
                        placeholder=''
                    />
                </div>
                <div className="filtersWidget__footer" />
            </div>
        )
    }
}

FiltersWidget.propTypes = {
    contexts: PropTypes.instanceOf(Immutable.List),
    selectedContext: PropTypes.instanceOf(Immutable.Map),
    selectedDimension: PropTypes.instanceOf(Immutable.Map),
    selectedFields: PropTypes.instanceOf(Immutable.List)
};

FiltersWidget.defaultProps = {
    contexts: Immutable.List([])
};
