import React from 'react'
import { css } from 'emotion';
import { SelectBase } from 'react-select';
import { makeCreatableSelect } from 'react-select/lib/Creatable';
import manageState from 'react-select/lib/stateManager';

import modifier from './indicatorSelectModifier';

const ModifiedSelectComponent = (modifier(SelectBase));

class MagnifierSelectComponent extends ModifiedSelectComponent {
    constructor(...props) {
        super(...props);
        this.components.DropdownIndicator = this.magnifierIndicator;
    }

    magnifierIndicator(props) {
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
                {children || <img src={require('./magnifier.png')} />}
            </div>
        );
    }
}

export default manageState(makeCreatableSelect(MagnifierSelectComponent));