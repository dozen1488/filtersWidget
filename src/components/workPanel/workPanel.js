import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';
import first from 'lodash/first';
import flatten from 'lodash/flatten';

import userMessages from '../../constants/userMessages';
import { SelectOption } from '../optionComponent';
import Context from '../../domain/models/context';
import { FiltersWidget } from '../filtersWidget';

import './workPanel.less';

export default class WorkPanel extends PureComponent {
    constructor(...args) {
        super(...args);

        const props = first(args);

        this.onContextSelect = this.props.onContextSelect.bind(this, props.panelIndex);
        this.onContextsChange = this.props.onContextsChange.bind(this, props.panelIndex);
        this.onDimensionSelect = this.props.onDimensionSelect.bind(this, props.panelIndex);
        this.onDimensionsChange = this.props.onDimensionsChange.bind(this, props.panelIndex);
        this.onFieldsChange = this.props.onFieldsChange.bind(this, props.panelIndex);

        this.switchWidgetExpanded = this.switchWidgetExpanded.bind(this);

        this.state = {
            isWidgetExpanded: false
        };
    }

    switchWidgetExpanded() {
        this.setState((state) => ({ isWidgetExpanded: !state.isWidgetExpanded}));
    }

    render() {
        const contexts = this.props.contextsOptions
            ? this.props.contextsOptions.toArray().map(Context.fromImmutable)
            : [];
        const selectedContexts = contexts.filter(context => this.props.selectedContexts.find(sel => sel.get('id') === context.id));
        
        const dimensions = flatten(selectedContexts.map(context => context.dimensions));
        const selectedDimensions = dimensions.filter(dimension => this.props.selectedDimensions.find(sel => sel.get('dimensionName') === dimension.dimensionName));
        const fieldsOptions = flatten(selectedDimensions.map(dim => dim.fields))
            .sort((a, b) => {
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            });
        const selectedFields = fieldsOptions.filter(field => this.props.selectedFields.find(sel => sel.get('field') === field.field));
        
        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <div onClick={this.switchWidgetExpanded} className="switch-expand-button">
                        <span>{userMessages["workPanel.expandButton"]}</span>
                    </div>
                    <Draggable cancel=".filtersWidgetField">
                        <FiltersWidget
                            contextsOptions={contexts}
                            dimensionsOptions={dimensions}
                            fieldsOptions={fieldsOptions}
                        
                            selectedContext={selectedContexts}
                            selectedDimension={selectedDimensions}
                            selectedFields={selectedFields}
            
                            onContextSelect={this.onContextSelect}
                            onContextsChange={this.onContextsChange}
                            onDimensionSelect={this.onDimensionSelect} 
                            onDimensionsChange={this.onDimensionsChange}
                            onFieldsChange={this.onFieldsChange}
                            isWidgetExpanded={this.state.isWidgetExpanded}
                        />
                    </ Draggable>
                </div>
                <div className="work-panel__workfield">
                    {selectedFields.map(
                        field => <SelectOption
                            isSelected
                            label={field.label}
                            key={field.label}
                        />
                    )}
                </div>
            </div>
        )
    }
}

WorkPanel.propTypes = {
    contextsOptions: PropTypes.instanceOf(List),

    selectedContexts: PropTypes.number,
    selectedDimensions: PropTypes.number,
    selectedFields: PropTypes.instanceOf(List),
    
    onContextSelect: PropTypes.func.isRequired,
    onContextsChange: PropTypes.func.isRequired,
    onDimensionsSelect: PropTypes.func.isRequired,
    onDimensionsChange: PropTypes.func.isRequired,
    onFieldsChange: PropTypes.func.isRequired,

    isWidgetExpanded: PropTypes.bool
};

WorkPanel.defaultProps = {
    contextsOptions: List(),
    isWidgetExpanded: false
};
