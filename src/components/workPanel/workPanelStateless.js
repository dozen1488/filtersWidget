import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';
import first from 'lodash/first';

import { SelectOption } from '../optionComponent';
import Context from '../../models/context';
import { FiltersWidget } from '../filtersWidget';

import './workPanel.less';

export default class WorkPanel extends PureComponent {
    constructor(...args) {
        super(...args);

        const props = first(args);

        this.onSelectContext = this.props.onSelectContext.bind(this, props.panelIndex);
        this.onDimensionsSelect = this.props.onDimensionsSelect.bind(this, props.panelIndex);
        this.onFieldChange = this.props.onFieldChange.bind(this, props.panelIndex);
    }

    render() {
        const contexts = this.props.contextsOptions
            ? this.props.contextsOptions.toArray().map(Context.fromImmutable)
            : [];
        const dimensions = (contexts[this.props.selectedContextIndex] && contexts[this.props.selectedContextIndex].dimensions) || [];
        const fieldsOptions = (dimensions[this.props.selectedDimensionIndex] && dimensions[this.props.selectedDimensionIndex].fields) || [];

        const selectedContext =contexts[this.props.selectedContextIndex];
        const selectedDimension = dimensions[this.props.selectedDimensionIndex];
        const selectedFields = this.props.selectedFields || [];
        
        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <Draggable bounds="parent" cancel=".filtersWidgetField">
                        <FiltersWidget
                            contextsOptions={contexts}
                            dimensionsOptions={dimensions}
                            fieldsOptions={fieldsOptions}
                        
                            selectedContext={selectedContext}
                            selectedDimension={selectedDimension}
                            selectedFields={selectedFields}
            
                            onSelectContext={this.onSelectContext}
                            onDimensionsSelect={this.onDimensionsSelect}
                            onFieldChange={this.onFieldChange}
                        />
                    </Draggable>
                </div>
                <div className="work-panel__workfield">
                    {selectedFields.map(
                        field => <SelectOption
                            isSelected
                            label={field}
                            key={field}
                        />
                    )}
                </div>
            </div>
        )
    }
}

WorkPanel.propTypes = {
    contexts: PropTypes.instanceOf(List)
}

WorkPanel.defaultProps = {
    contexts: List()
}