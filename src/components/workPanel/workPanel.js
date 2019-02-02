import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';

import { SelectOption } from '../optionComponent';
import Context from '../../models/context';
import { FiltersWidget } from '../filtersWidget';

import './workPanel.less';

export default class WorkPanel extends PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {
            pickedFields: (args[0].defaultState && args[0].defaultState.pickedFields) || []
        };
    }

    saveState() {
        return {
            filtersWidgetState: this.widgetRef.saveState(),
            pickedFields: this.state.pickedFields
        }
    }

    saveWidgetRef(widgetRef) {
        this.widgetRef = widgetRef;
    }

    onFieldChange(pickedOptions) {
        this.setState({
            pickedFields: pickedOptions
        })
    }

    render() {
        const contexts = this.props.contexts
            ? this.props.contexts.toArray().map(Context.fromImmutable)
            : [];

        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <Draggable bounds="parent" cancel=".filtersWidgetField">
                        <FiltersWidget
                            contexts={contexts}
                            // React inside does 'toString' for key
                            key={contexts.map(c => c.id)}
                            onFieldChange={this.onFieldChange.bind(this)}
                            ref={this.saveWidgetRef.bind(this)}
                        />
                    </Draggable>
                </div>
                <div className="work-panel__workfield">
                    {this.state.pickedFields.map(
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