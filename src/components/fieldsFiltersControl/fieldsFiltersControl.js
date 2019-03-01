import React from 'react';
import { css as emotionCSS } from 'emotion';
import { memo } from 'react';
import PropTypes from 'prop-types';

import { FieldsFiltersBar } from '../fieldsFiltersBar';

const FieldsFiltersControl = memo((props) => {
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

FieldsFiltersControl.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    cx: PropTypes.func.isRequired,
    className: PropTypes.string,
    getStyles: PropTypes.func,
    selectProps: PropTypes.shape({
        onFilterCheckboxSelect: PropTypes.func.isRequired,
        fieldsFilterName: PropTypes.string
    }),

    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    menuIsOpen: PropTypes.bool,

    innerRef: PropTypes.func,
    innerProps: PropTypes.object
};

FieldsFiltersControl.defaultProps = {
    children: null,
    getStyles: () => {},
    selectProps: {
        onFilterCheckboxSelect: () => {}
    },
    innerRef: () => {},
    innerProps: {}
}

export default FieldsFiltersControl;