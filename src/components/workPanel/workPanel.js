import React, { Component } from 'react'
import { FiltersWidget } from '../filtersWidget';
import Draggable from 'react-draggable';

import './workPanel.less';

export default class WorkPanel extends Component {
    render() {
        return (
            <div className="work-panel">
                <div className="work-panel__sidebar">
                    <Draggable bounds="parent">
                        <FiltersWidget 
                            contexts={this.props.contexts}
                            key={Date.now()}
                        />
                    </Draggable>
                </div>
                <div className="work-panel__workfield">

                </div>
            </div>
        )
    }
}
