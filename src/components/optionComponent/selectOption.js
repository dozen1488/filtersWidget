import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import './optionComponent.less';

class SelectOption extends PureComponent {

    onPick() {
        if (this.props.selectOption) this.props.selectOption(this.props.data);
    }

    render() {
        return (
            <div className="option" onClick={this.onPick.bind(this)}>
                <input
                    type="checkbox"
                    className="option__label-input"
                    checked={this.props.isSelected}
                    onChange={this.onPick.bind(this)}
                />
                <p className="option__label-container">
                    {this.props.label}
                </p>
            </div>
        )
    }
}

SelectOption.propTypes = {
    selectOption: PropTypes.func,
    isSelected: PropTypes.bool,
    label: PropTypes.string,
    data: PropTypes.object.isRequired
};

SelectOption.defaultProps = {
    label: ''
};

export default SelectOption;