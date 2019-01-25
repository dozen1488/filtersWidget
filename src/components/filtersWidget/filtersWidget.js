import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { OptionComponent } from '../optionComponent';
import { FilterComponent, MagnifierSelectComponent } from '../filterComponent';
import userMessages from '../../constants/userMessages';
import './filtersWidget.css';

export default class FiltersWidget extends Component {
    constructor(...props) {
        super(...props);
        this.state = {};
    }

    getContextOptions() {
        const contexts = (this.props.contexts)
            ? this.props.contexts
            : Immutable.List([]);

        return contexts.toJS();
    }

    getDimensionsOptions() {
        return (this.props.selectedContext)
            ? this.props.selectedContext.get('dimensions')
            : Immutable.List([]);
    }

    getFiltersOptions() {
        return (this.props.selectedDimension)
            ? this.props.selectedDimension.get('fields')
            : Immutable.List([]);
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

    render() {
        return (
            <div className="filtersWidget">
                <div className='filtersWidget__header'>
                    {userMessages["filtersWidget.header.filters"]}
                </div>
                <div className="filtersWidget__line-container">
                    <FilterComponent
                        isMulti
                        options={this.getContextOptions()}
                        selectedOption={this.props.selectedContext}
                        className={'filtersWidget__container'}
                        classNamePrefix={'filtersWidget'}
                        components={{ Option: OptionComponent }}
                        styles={this.getEmptyStyles()}
                        placeholder={userMessages["filtersWidget.placeholder.context"]}
                    />
                </div>
                <div className="filtersWidget__line-container">
                    <FilterComponent
                        options={this.getDimensionsOptions()}
                        selectedOption={this.props.selectedDimension}
                        className={'filtersWidget__container'}
                        classNamePrefix={'filtersWidget'}
                        styles={this.getEmptyStyles()}
                        placeholder={userMessages["filtersWidget.placeholder.dimensions"]}
                    />
                </div>
                <div className="filtersWidget__line-container">
                    <MagnifierSelectComponent 
                        options={this.getFiltersOptions()}
                        selectedOptions={this.props.selectedFields}
                        className={'filtersWidgetFilter__container'}
                        classNamePrefix={'filtersWidget'}
                        styles={this.getEmptyStyles()}
                        placeholder=''
                        menuIsOpen
                    />
                </div>
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
