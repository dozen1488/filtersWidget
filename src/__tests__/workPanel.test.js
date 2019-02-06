import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import jset from 'jest-mock';

import { SelectOption } from '../components/optionComponent';
import { WorkPanel } from '../components/workPanel';
import { FilterComponent } from '../components/filterComponent';

describe('WorkPanel', () => {  
    const fieldsOptions = ['a', 'b', 'c'];
    const dimensions = [{
        dimensionName: 'a',
        fields: fieldsOptions
    }];
    const contexts = fromJS([{
        id: 1,
        name: 'a',
        dimensions: dimensions
    }]);

    const component = mount(
        <WorkPanel
            contextsOptions={contexts}

            selectedContextIndex={0}
            selectedDimensionIndex={0}
            selectedFields={fromJS(fieldsOptions)}

            onSelectContext={() => {}}
            onDimensionsSelect={() => {}}
            onFieldChange={() => {}}

            isWidgetExpanded
        />
    );
    
    it('should render correctly with correct props and must match snap', () => {
        expect(component).toMatchSnapshot();
    });
});