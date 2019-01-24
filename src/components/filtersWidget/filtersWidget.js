import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { FilterComponent } from '../filterComponent';

import './filtersWidget';

export default class FiltersWidget extends Component {
    constructor(...props) {
        super(...props);
        this.state = {};
    }

    getDimensionsOptions() {
        return (this.props.selectedContext)
            ? this.props.selectedContext.get('dimensions')
            : Immutable.List([]);
    }

    getFiltersOptions() {
        return (this.props.selectedDimension)
            ? this.props.selectedDimension.get('fields')
            : Immutable.List([]);
    }

    render() {
        return (
            <div className="filtersWidget">
                <FilterComponent
                    options={this.props.contexts}
                    selectedOption={this.props.selectedContext}
                />
                <FilterComponent
                    options={this.getDimensionsOptions()}
                    selectedOption={this.props.selectedDimension}
                />
                <FilterComponent 
                    options={this.getFiltersOptions()}
                    selectedOptions={this.props.selectedFields}
                />
            </div>
        )
    }
}

FiltersWidget.propTypes = {
    contexts: PropTypes.instanceOf(Immutable.List),
    selectedContext: PropTypes.instanceOf(Immutable.Map),
    selectedDimension: PropTypes.instanceOf(Immutable.Map),
    selectedFields: PropTypes.instanceOf(Immutable.List)
};

FiltersWidget.defaultProps = {
    contexts: Immutable.List([])
};
