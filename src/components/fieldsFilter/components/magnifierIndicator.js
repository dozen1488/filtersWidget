import React from 'react';
import { css } from 'emotion';

export default (props) => {
    const { children, className, cx, getStyles, innerProps } = props;
    return (
        <div
            {...innerProps}
            className={cx(
                css(getStyles('dropdownIndicator', props)),
                {
                    'indicator': true,
                    'dropdown-indicator': true,
                },
                className,
            )}
        >
            {children || <img alt="" src={require('./magnifier.png')} />}
        </div>
    );
}