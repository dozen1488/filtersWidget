import React from 'react';

import { returnUndefinedFunction } from '../../helpers/helperFunctions';

export default (BaseClass) => {
    
    const modifiedBaseClass = class ModifiedBaseClass extends BaseClass {
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

    modifiedBaseClass.defaultProps = { ...BaseClass.defaultProps };
    // Removing default style-based styles
    // We will use class-based styling
    modifiedBaseClass.defaultProps.styles = {
        clearIndicator: returnUndefinedFunction,
        container: returnUndefinedFunction,
        control: returnUndefinedFunction,
        dropdownIndicator: returnUndefinedFunction,
        group: returnUndefinedFunction,
        groupHeading: returnUndefinedFunction,
        indicatorsContainer: returnUndefinedFunction,
        indicatorSeparator: returnUndefinedFunction,
        input: returnUndefinedFunction,
        loadingIndicator: returnUndefinedFunction,
        loadingMessageCSS: returnUndefinedFunction,
        menu: returnUndefinedFunction,
        menuList: returnUndefinedFunction,
        menuPortal: returnUndefinedFunction,
        multiValue: returnUndefinedFunction,
        multiValueLabel: returnUndefinedFunction,
        multiValueRemove: returnUndefinedFunction,
        noOptionsMessageCSS: returnUndefinedFunction,
        option: returnUndefinedFunction,
        placeholder: returnUndefinedFunction,
        singleValue: returnUndefinedFunction,
        valueContainer:  returnUndefinedFunction,
    };

    return modifiedBaseClass;
}