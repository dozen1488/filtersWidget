import React from 'react';
import { css as emotionCSS } from 'emotion';

import filterStateEnum from './filterStateEnum';

export default (props) => {
    const {
        cx, getStyles, className, onFilterCheckboxSelect, fieldsFilterName
    } = props;
    return (
        <div
            className={cx(emotionCSS(getStyles('control', props)), {
                'checkbox-container': true
            }, className)}
        >
            <div
                onClick={() => onFilterCheckboxSelect(filterStateEnum.PARTIAL)}
                className={cx(emotionCSS(getStyles('control', props)), {
                    'checkbox-partial-overlap': true
                }, className)}
            >
                <span>**</span>
            </div>
            <div
                onClick={() => onFilterCheckboxSelect(filterStateEnum.FULL)}
                className={cx(emotionCSS(getStyles('control', props)), {
                    'checkbox-full-overlap': true
                }, className)}
            >
                <span>A-Z</span>
            </div>
        </div>
    )
}