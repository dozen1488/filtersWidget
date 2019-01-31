import React, { PureComponent } from 'react'

import './optionComponent.less';

export default class SelectOption extends PureComponent {

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
