import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';

import { SelectOption } from '../optionComponent';
import Context from '../../models/context';
import { FiltersWidget } from '../filtersWidget';

import './workPanel.less';

export default class WorkPanel extends PureComponent {
    render() {
        const contexts = this.props.contexts
            ? this.props.contexts.toArray().map(Context.fromImmutable)
            : [];

        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <Draggable bounds="parent" cancel=".filtersWidgetField">
                        <FiltersWidget
                            contextsOptions={contexts}
                            dimensionsOptions={(this.props.selectedContext && this.props.selectedContext.dimensions) || []}
                            fieldsOptions={(this.props.selectedDimension && this.props.selectedDimension.fields) || []}
                        
                            selectedContext={this.props.selectedContext}
                            selectedDimension={this.props.selectedDimension}
                            selectedFields={this.props.selectedFields}
            
                            onSelectContext={this.props.onSelectContext}
                            onDimensionsSelect={this.props.onDimensionsSelect}
                            onFieldChange={this.props.onFieldChange}
                        />
                    </Draggable>
                </div>
                <div className="work-panel__workfield">
                    {this.props.selectedFields.map(
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