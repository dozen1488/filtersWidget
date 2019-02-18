import React from 'react';
import { css as emotionCSS } from 'emotion';
import { memo } from 'react';

import filterStateEnum from './filterStateEnum';

export default memo((props) => {
    const {
        cx, getStyles, className, selectProps
    } = props;
    const { onFilterCheckboxSelect, fieldsFilterName } = selectProps;
    return (
        <div
            className={cx(emotionCSS(getStyles('control', props)), {
                'checkbox-container': true
            }, className)}
        >
            <div
                onClick={() => onFilterCheckboxSelect(filterStateEnum.PARTIAL)}
                className={cx(emotionCSS(getStyles('control', props)), {
                    'checkbox-filter': true,
                    'checkbox-filter-partial': true,
                    'checkbox-filter_active': fieldsFilterName === filterStateEnum.PARTIAL
                }, className)}
            >
                <span>* *</span>
            </div>
            <div
                onClick={() => onFilterCheckboxSelect(filterStateEnum.FULL)}
                className={cx(emotionCSS(getStyles('control', props)), {
                    'checkbox-filter': true,
                    'checkbox-filter-full': true,
                    'checkbox-filter_active': fieldsFilterName === filterStateEnum.FULL
                }, className)}
            >
                <span>A-Z</span>
            </div>
        </div>
    )
});