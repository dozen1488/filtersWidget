import React, { PureComponent } from 'react'
import Draggable from 'react-draggable';
import PropTypes  from 'prop-types';
import { List } from 'immutable';

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
                            contexts={contexts}
                            key={this.props.contexts}
                        />
                    </Draggable>
                </div>
                <div className="work-panel__workfield">

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