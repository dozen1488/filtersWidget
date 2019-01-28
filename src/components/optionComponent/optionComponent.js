import React, { Component } from 'react'

import './optionComponent.css';

export default class OptionComponent extends Component {

    onPick() {
        this.props.selectOption(this.props.data);
    }

    render() {
        return (
            <div className="option" onClick={this.onPick.bind(this)}>
                <input
                    type="checkbox"
                    className="option__label-input"
                    checked={this.props.isSelected}
                />
                <p className="option__label-container">
                    {this.props.label}
                </p>
            </div>
        )
    }
}
