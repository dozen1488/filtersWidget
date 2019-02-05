import React from 'react';
import { mount } from 'enzyme';
import jset from 'jest-mock';

import { sameValueFunction } from '../helpers/helperFunctions'; 
import { SelectOption } from '../components/optionComponent';
import { FieldsFilter } from '../components/fieldsFilter';

describe('FieldsFilters', () => {  
    const options = [
        'ab', 'cd', 'abcd', 'fh'
    ];
    const props = {
        options: options,
        onChange: () => {}
    }
    const component = mount(
        <FieldsFilter
            getValue={sameValueFunction}
            getOptionLabel={sameValueFunction}
            getOptionValue={sameValueFunction}
            getLabel={sameValueFunction}
            isMulti={true}
            menuIsOpen={true}
            noOptionsMessage={() => ''}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            components={{
                Option: SelectOption
            }}
            className='filtersWidget__container'
            classNamePrefix='filtersWidget'
            placeholder='Context'
            {...props}
        />
    );
    
    it('should render correctly with correct props and must match snap', () => {
        expect(component).toMatchSnapshot();
    });

    it('should filter by StartWith by default in case of non-empty input', () => {
        const inputComponent = component.find('.filtersWidget__value-container input');
        const input = inputComponent.getDOMNode();
    
        // This is to set the event.currentTarget.value
        // Enzyme issue : https://github.com/airbnb/enzyme/issues/218
        input.value = 'a';
        inputComponent.simulate('change', { keyCode: 65, Key: 'a' });

        expect(component.find(SelectOption).map(o => o.props().label)).toEqual(['ab', 'abcd']);
    });
    it('should filter by Partial after click on filter', () => {
        const inputComponent = component.find('.filtersWidget__value-container input');
        const filterPartial = component.find('.filtersWidget__checkbox-filter-partial');
        const input = inputComponent.getDOMNode();

        filterPartial.simulate('click');

        // https://github.com/airbnb/enzyme/issues/218
        input.value = 'h';
        inputComponent.simulate('change', { keyCode: 72, Key: 'h' });

        expect(component.find(SelectOption).map(o => o.props().label)).toEqual(['fh']);
    });
    it('should filter by Full after click on filter', () => {
        const inputComponent = component.find('.filtersWidget__value-container input');
        const filterPartial = component.find('.filtersWidget__checkbox-filter-full');
        const input = inputComponent.getDOMNode();

        filterPartial.simulate('click');

        // https://github.com/airbnb/enzyme/issues/218
        input.value = 'a';
        inputComponent.simulate('change', { keyCode: 65, Key: 'a' });
        input.value = 'ab';
        inputComponent.simulate('change', { keyCode: 66, Key: 'b' });

        expect(component.find(SelectOption).map(o => o.props().label)).toEqual(['ab']);
    });
    it('emits proper onChange', () => {
        const mockFunction = jset.fn();

        component.setProps({
            onChange: mockFunction
        });
        const optionComponent = component.find(SelectOption);
        const optionData = optionComponent.props().data;

        optionComponent.simulate('click');

        expect(mockFunction.mock.calls[0][0]).toEqual([optionData]);
    })
});