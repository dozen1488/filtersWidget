import React from 'react';
import { mount } from 'enzyme';

import Context from '../../domain/models/context';
import Dimension from '../../domain/models/dimension';

import { FiltersWidget } from '../../components/filtersWidget';
import { SelectOption } from '../../components/optionComponent';
import { FilterComponent } from '../../components/filterComponent';

describe('FiltersWidget', () => {  
    const fieldsOptions = ['a', 'b', 'c'];
    const dimensions = [new Dimension('Dimension1', fieldsOptions)];
    const contexts = [new Context(1, dimensions, 'Context1')];

    const component = mount(
        <FiltersWidget
            contextsOptions={contexts}
            dimensionsOptions={dimensions}
            fieldsOptions={fieldsOptions}

            onSelectContext={() => {}}
            onDimensionsSelect={() => {}}
            onFieldsChange={() => {}}
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

    // This test can't be run due to inner enzyme bugs

    it('should emit necessary onChange events by click', () => {
        const mockSelectContext = jest.fn();
        const mockDimensionsSelect = jest.fn();
        const mockFieldChange = jest.fn();

        component.setProps({
            onSelectContext: mockSelectContext,
            onDimensionsSelect: mockDimensionsSelect,
            onFieldsChange: mockFieldChange
        });
        // Open menu
        component.find(FilterComponent)
            .filter({ selectName:'contextsOptions' })
            .find('div.filtersWidget__dropdown-indicator')
            .simulate('mouseDown', { button: 0 });
        // Click option
        component
            .find(SelectOption)
            .at(0)
            .simulate('click');
    
        expect(mockSelectContext.mock.calls[0][0]).toBe(0);

        component.find(FilterComponent)
            .filter({ selectName:'dimensionsOptions' })
            .find('div.filtersWidget__dropdown-indicator')
            .simulate('mouseDown', { button: 0 });
        component
            .find(SelectOption)
            .at(0)
            .simulate('click');

        expect(mockDimensionsSelect.mock.calls[0][0]).toBe(0);
        
        component
            .find(SelectOption)
            .at(0)
            .simulate('click');
        expect(mockFieldChange.mock.calls[0][0]).toEqual(['a']);
    });
});