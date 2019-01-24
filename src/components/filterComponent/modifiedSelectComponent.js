import React, { Component } from 'react'
import propTypes from 'prop-types';
import manageState from 'react-select/lib/stateManager';
import { SelectBase } from 'react-select';

// This class is created to override default render of select arrow
class ModifiedSelectComponent extends SelectBase {
    render() {
        const {
            Control,
            IndicatorsContainer,
            SelectContainer,
            ValueContainer,
        } = this.components;

        const { className, id, isDisabled, menuIsOpen } = this.props;
        const { isFocused } = this.state;

        const commonProps = (this.commonProps = this.getCommonProps());

        return (
            <SelectContainer
                {...commonProps}
                className={className}
                innerProps={{
                    id: id,
                    onKeyDown: this.onKeyDown,
                }}
                isDisabled={isDisabled}
                isFocused={isFocused}
            >
                {this.renderLiveRegion()}
                <Control
                    {...commonProps}
                    innerRef={this.getControlRef}
                    innerProps={{
                        onMouseDown: this.onControlMouseDown,
                        onTouchEnd: this.onControlTouchEnd,
                    }}
                    isDisabled={isDisabled}
                    isFocused={isFocused}
                    menuIsOpen={menuIsOpen}
                >
                    <IndicatorsContainer {...commonProps} isDisabled={isDisabled}>
                        {this.renderClearIndicator()}
                        {this.renderLoadingIndicator()}
                        {this.renderIndicatorSeparator()}
                        {this.renderDropdownIndicator()}
                    </IndicatorsContainer>
                    <ValueContainer {...commonProps} isDisabled={isDisabled}>
                        {this.renderPlaceholderOrValue()}
                        {this.renderInput()}
                    </ValueContainer>
                </Control>
                {this.renderMenu()}
                {this.renderFormField()}
            </SelectContainer>
        );
    }
}

export default manageState(ModifiedSelectComponent);