import React from 'react'

export default (BaseClass) => {
    return class ModifiedBaseClass extends BaseClass{
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
}