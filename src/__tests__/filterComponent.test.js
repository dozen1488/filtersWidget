import React from 'react';
import { mount } from 'enzyme';

import { SelectOption } from '../components/optionComponent';
import { FilterComponent } from '../components/filterComponent';

describe('FieldsFiltersBar', () => {
    it('should render correctly with correct props and must match snap', () => {
        const options = [
            {
                label: 'a',
                value: 'a'
            },{
                label: 'b',
                value: 'b'
            }
        ]
        const props = {
            options: options,
            onChange: () => {},
            value: options[1],

            components: {
                Option: SelectOption
            },
            className:'filtersWidget__container',
            classNamePrefix: 'filtersWidget',
            placeholder: 'Context'
        }
        const component = mount(
            <FilterComponent
                {...props}
            />
        );

        expect(component).toMatchSnapshot();
    });
});