import React from 'react';
import { css as emotionCSS } from 'emotion';
import { memo } from 'react';

import { FieldsFiltersBar } from '../fieldsFiltersBar';

export default memo((props) => {
    const {
        children, cx, getStyles, className, isDisabled, isFocused, innerRef, innerProps, menuIsOpen
    } = props;
    return (
        <div
            ref={innerRef}
            className={cx(emotionCSS(getStyles('control', props)), {
                'control': true,
                'control--is-disabled': isDisabled,
                'control--is-focused': isFocused,
                'control--menu-is-open': menuIsOpen
            }, className)}
            {...innerProps}
        >
            <div
                className={cx(emotionCSS(getStyles('control', props)), {
                    'inner-container': true
                }, className)}
            >
                {children}
            </div>
            <FieldsFiltersBar
                {...props}
            />
        </div>
    );
});
