import React from 'react';
import { mount } from 'enzyme';

import Context from '../models/context';
import Dimension from '../models/dimension';

import { FiltersWidget } from '../components/filtersWidget';

describe('FiltersWidget', () => {  
    const fieldsOptions = ['a', 'b', 'c'];
    const dimensions = [new Dimension('a', fieldsOptions)];
    const contexts = [new Context(1, dimensions, 'a')];

    const component = mount(
        <FiltersWidget
            contextsOptions={contexts}
            dimensionsOptions={dimensions}
            fieldsOptions={fieldsOptions}

            onSelectContext={() => {}}
            onDimensionsSelect={() => {}}
            onFieldChange={() => {}}
        />
    );
    
    it('should render correctly with correct props and must match snap', () => {
        expect(component).toMatchSnapshot();
    });

    it('should open and close using indicator', () => {
        const downArrowComponent = component.find('.filtersWidget__header svg');
        let hiddenComponent = component.find('.filtersWidget__body--hidden');
        expect(hiddenComponent.length).toBe(1);
    
        downArrowComponent.simulate('click');

        hiddenComponent = component.find('.filtersWidget__body--hidden');
        expect(hiddenComponent.length).toBe(0);
    });
});