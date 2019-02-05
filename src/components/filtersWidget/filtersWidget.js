import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { DownChevron } from 'react-select/lib/components/indicators';
import classnames from 'classnames';

import { sameValueFunction, returnNullFunction } from '../../helpers/helperFunctions'; 
import { SelectOption } from '../optionComponent';
import { FieldsFilter } from '../fieldsFilter';
import { FilterComponent } from '../filterComponent';
import userMessages from '../../constants/userMessages';

import Context from '../../models/context';
import Dimension from '../../models/dimension';

import './filtersWidget.less';

export default class FiltersWidget extends PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {
            isWidgetExpanded: args[0].isWidgetExpanded
        };
    }

    onContextChange(data) {
        if (this.props.onSelectContext) {
            const index = this.props.contextsOptions.indexOf(data.value);
            this.props.onSelectContext(index);
        }
    }

    onDimensionChange(data) {
        if (this.props.onDimensionsSelect) {
            const index = this.props.dimensionsOptions.indexOf(data.value);
            this.props.onDimensionsSelect(index);
        };
    }

    onFieldChange(pickedOptions) {
        if (this.props.onFieldChange) this.props.onFieldChange(pickedOptions);
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
                                options={this.props.contextsOptions}
                                onChange={this.onContextChange.bind(this)}
                                value={this.props.selectedContext}
                                
                                components={{ Option: SelectOption }}
                                className={'filtersWidget__container'}
                                classNamePrefix={'filtersWidget'}
                                placeholder={userMessages["filtersWidget.placeholder.context"]}

                                selectName='contextsOptions'
                            />
                        </div>
                        <div className="filtersWidget__line-container">
                            <FilterComponent
                                options={this.props.dimensionsOptions}
                                onChange={this.onDimensionChange.bind(this)}
                                value={this.props.selectedDimension}

                                className={'filtersWidget__container'}
                                classNamePrefix={'filtersWidget'}
                                placeholder={userMessages["filtersWidget.placeholder.dimensions"]}
                                components={{ Option: SelectOption }}
                                
                                selectName='dimensionsOptions'
                            />
                        </div>
                        <div className="filtersWidget__line-container">
                            <FieldsFilter
                                onChange={this.onFieldChange.bind(this)}
                                options={this.props.fieldsOptions.sort((a, b) => {
                                    if(a < b) { return -1; }
                                    if(a > b) { return 1; }
                                    return 0;
                                })}  
                                value={this.props.selectedFields}

                                getValue={sameValueFunction}
                                getOptionLabel={sameValueFunction}
                                getOptionValue={sameValueFunction}
                                getLabel={sameValueFunction}
                                isMulti
                                menuIsOpen
                                noOptionsMessage={() => ''}
                                controlShouldRenderValue={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option: SelectOption,
                                    MultiValue: returnNullFunction,
                                    ClearIndicator: returnNullFunction
                                }}
                                className={'filtersWidget__container filtersWidgetField'}
                                classNamePrefix={'filtersWidget'}
                                placeholder=''
                            />
                        </div>
                        <div className="filtersWidget__footer" />
                    </div>
                </div>
            </div>
            
        );
    }
}

FiltersWidget.propTypes = {
    contextsOptions: PropTypes.arrayOf(PropTypes.instanceOf(Context)),
    dimensionsOptions: PropTypes.arrayOf(PropTypes.instanceOf(Dimension)),
    fieldsOptions: PropTypes.arrayOf(PropTypes.string),

    selectedContext: PropTypes.object,
    selectedDimension: PropTypes.object,
    selectedFields: PropTypes.array,

    onSelectContext: PropTypes.func,
    onDimensionsSelect: PropTypes.func,
    onFieldChange: PropTypes.func,
    
    isWidgetExpanded: PropTypes.bool,

    // <-- For Draggable
    className: PropTypes.string,
    style: PropTypes.object,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func
    // For Draggable -->
};

FiltersWidget.defaultProps = {
    contextsOptions: [],
    dimensionsOptions: [],
    fieldsOptions: [],
    
    selectedContext: null,
    selectedDimension: null,
    selectedFields: [],
    isWidgetExpanded: false
};