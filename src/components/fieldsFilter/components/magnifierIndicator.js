import React from 'react';
import { css } from 'emotion';
import { memo } from 'react';

import PropTypes from 'prop-types';

const MagnifierIndicator = memo((props) => {
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

MagnifierIndicator.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    className: PropTypes.string,
    cx: PropTypes.func.isRequired,
    getStyles: PropTypes.func,
    innerProps: PropTypes.object
};

MagnifierIndicator.defaultPropos = {
    children: null,
    getStyles: () => {},
    innerProps: {}
};

export default MagnifierIndicator;