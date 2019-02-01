import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { DownChevron } from 'react-select/lib/components/indicators';
import classnames from 'classnames';

import { SelectOption } from '../optionComponent';
import { FieldsFilter } from '../fieldsFilter';
import { FilterComponent } from '../filterComponent';
import userMessages from '../../constants/userMessages';

import Context from '../../models/context';
import './filtersWidget.less';

export default class FiltersWidget extends PureComponent {
    constructor(...args) {
        super(...args);
        const [ props ] = args;
        this.state = {
            contexts: props.contexts,
            selectedContext: null,
            selectedDimension: null,
            selectedFields: [],
            isWidgetExpanded: false
        };
    }

    saveState() {
        const selectedContextIndex = this.state.contexts.indexOf(this.state.selectedContext);
        const selectedDimensionIndex = this.state.selectedContext && this.state.selectedContext.dimensions.indexOf(this.state.selectedDimension);

        return {
            hash: this.state.contexts.map(c => c.id).toString(),
            selectedContextIndex: ~(selectedContextIndex)
                ? selectedContextIndex
                : null,
            selectedDimensionIndex: ~(selectedDimensionIndex)
                ? selectedDimensionIndex
                : null,
            selectedFields: this.state.selectedFields
        }
    }

    onContextChange(data) {
        if (this.props.onSelectContext) this.props.onSelectContext(data.value);

        this.setState({
            selectedContext: data.value,
            selectedDimension: null
        });
    }

    onDimensionChange(data) {
        if (this.props.onDimensionsSelect) this.props.onDimensionsSelect(data.value);

        this.setState({
            selectedDimension: data.value
        });
    }

    onFieldChange(pickedOptions) {
        if (this.props.onFieldSelect) this.props.onFieldSelect(pickedOptions);

        this.setState({
            selectedFields: pickedOptions
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
                                className={'filtersWidget__container'}
                                key={this.state.selectedContext && this.state.selectedContext.id}
                                options={this.getDimensionsOptions()}
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

                                getValue={option => option}
                                getOptionLabel={option => option}
                                getOptionValue={option => option}
                                getLabel={option => option}
                                onChange={this.onFieldChange.bind(this)}

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
    contexts: PropTypes.arrayOf(PropTypes.instanceOf(Context)),
    onSelectContext: PropTypes.func,
    onDimensionsSelect: PropTypes.func,
    onFieldChange: PropTypes.func
};
