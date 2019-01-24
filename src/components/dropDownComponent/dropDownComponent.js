import React, { Component } from 'react'
import Dropdown from 'react-dropdown';

import userMessages from "../../constants/userMessages";

export default class DropDownComponent extends Component {
    render() {
        return (
            <Dropdown 
                options={this.props.options}
                placeholder={this.props.placeholder}
            />
        )
    }
}
