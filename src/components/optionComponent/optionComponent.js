import React, { Component } from 'react'

import './optionComponent.css';

export default class OptionComponent extends Component {
    render() {
        return (
            <div className="option">
                <input type="checkbox" className="option__label-input" checked={this.props.isSelected}/>
                <p className="option__label-container">
                    {this.props.label}
                </p>
            </div>
        )
    }
}
