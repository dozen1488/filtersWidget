import React from 'react';
import { css } from 'emotion';
import { memo } from 'react';

export default memo((props) => {
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
});