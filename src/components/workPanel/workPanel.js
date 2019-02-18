import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';
import first from 'lodash/first';

import userMessages from '../../constants/userMessages';
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
        const dimensions = (contexts[this.props.selectedContextIndex] && contexts[this.props.selectedContextIndex].dimensions) || [];
        const fieldsOptions = ((dimensions[this.props.selectedDimensionIndex] && dimensions[this.props.selectedDimensionIndex].fields) || [])
            .sort((a, b) => {
                if(a < b) { return -1; }
                if(a > b) { return 1; }
                return 0;
            });
        const selectedContext =contexts[this.props.selectedContextIndex];
        const selectedDimension = dimensions[this.props.selectedDimensionIndex];
        const selectedFields = (this.props.selectedFields && this.props.selectedFields.toJS()) || [];
        
        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <div onClick={this.switchWidgetExpanded}>{userMessages["workPanel.expandButton"]}</div>
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

                            isWidgetExpanded={this.state.isWidgetExpanded}
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
    contextsOptions: PropTypes.instanceOf(List),

    selectedContextIndex: PropTypes.number,
    selectedDimensionIndex: PropTypes.number,
    selectedFields: PropTypes.instanceOf(List),
    
    onSelectContext: PropTypes.func.isRequired,
    onDimensionsSelect: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,

    isWidgetExpanded: PropTypes.bool
};

WorkPanel.defaultProps = {
    contextsOptions: List(),
    isWidgetExpanded: false
};
