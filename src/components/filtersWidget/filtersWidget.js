import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { DownChevron } from 'react-select/lib/components/indicators';
import classnames from 'classnames';

import { SelectOption } from '../optionComponent';
import { FieldsFilter } from '../fieldsFilter';
import { FilterComponent } from '../filterComponent';
import userMessages from '../../constants/userMessages';

import './filtersWidget.less';

export default class FiltersWidget extends Component {
    constructor(...args) {
        super(...args);
        const [ props ] = args;
        this.state = {
            contexts: props.contexts,
            selectedContext: null,
            selectedDimension: null,
            isWidgetExpanded: false
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
        const contexts = (this.state.contexts)
            ? this.state.contexts
            : [];

        return contexts;
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

    switchWidgetExpanded() {
        this.setState((state) => ({ 
            isWidgetExpanded: !state.isWidgetExpanded
        }))
    }

    render() {
        return (
            <div
                className={classnames('draggable-container', this.props.className)}
                style={this.props.style}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                onTouchStart={this.props.onTouchStart}
                onTouchEnd={this.props.onTouchEnd}
            >
                <div className="filtersWidget">
                    <div className='filtersWidget__header'>
                        <p className='filtersWidget__header-text'>
                            {userMessages["filtersWidget.header.filters"]}
                        </p>
                        <DownChevron onClick={this.switchWidgetExpanded.bind(this)} />
                    </div>
                    <div className={
                        classnames('filtersWidget__body', {
                            'filtersWidget__body--hidden': !this.state.isWidgetExpanded
                        })
                    }>
                        <div className="filtersWidget__line-container">
                            <FilterComponent
                                components={{ Option: SelectOption }}
                                options={this.getContextOptions()}
                                className={'filtersWidget__container'}
                                classNamePrefix={'filtersWidget'}
                                styles={this.getEmptyStyles()}
                                placeholder={userMessages["filtersWidget.placeholder.context"]}
                                onChange={this.onContextChange.bind(this)}
                            />
                        </div>
                        <div className="filtersWidget__line-container">
                            <FilterComponent
                                components={{ Option: SelectOption }}
                                options={this.getDimensionsOptions()}
                                className={'filtersWidget__container'}
                                classNamePrefix={'filtersWidget'}
                                styles={this.getEmptyStyles()}
                                placeholder={userMessages["filtersWidget.placeholder.dimensions"]}
                                onChange={this.onDimensionChange.bind(this)}
                            />
                        </div>
                        <div className="filtersWidget__line-container">
                            <FieldsFilter
                                isMulti
                                menuIsOpen
                                noOptionsMessage={() => ''}
                                controlShouldRenderValue={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option: SelectOption,
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
