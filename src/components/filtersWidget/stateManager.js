import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import Context from '../../models/context';
import './filtersWidget.less';

import FiltersWidgetStateless from './FiltersWidgetStateless';

export default (FiltersWidgetComponent) => {
    class FiltersWidget extends PureComponent {
        constructor(...args) {
            super(...args);
    
            const [ props ] = args;
    
            this.state = {
                contexts: props.contexts,
                selectedContext: null,
                selectedDimension: null,
                selectedFields: []
            };
        }
    
        saveState() {
            const selectedContextIndex = this.state.contexts.indexOf(this.state.selectedContext);
            const selectedDimensionIndex = this.state.selectedContext && this.state.selectedContext.dimensions.indexOf(this.state.selectedDimension);
    
            return {
                hash: this.state.contexts.map(c => c.id).toString(),
                selectedContextIndex: ~(selectedContextIndex)
                    ? selectedContextIndex
                    : null,
                selectedDimensionIndex: ~(selectedDimensionIndex)
                    ? selectedDimensionIndex
                    : null,
                selectedFields: this.state.selectedFields
            }
        }
    
        onContextChange(data) {
            if (this.props.onSelectContext) this.props.onSelectContext(data.value);
    
            this.setState({
                selectedContext: data.value,
                selectedDimension: null
            });
        }
    
        onDimensionChange(data) {
            if (this.props.onDimensionsSelect) this.props.onDimensionsSelect(data.value);
    
            this.setState({
                selectedDimension: data.value
            });
        }
    
        onFieldChange(pickedOptions) {
            if (this.props.onFieldSelect) this.props.onFieldSelect(pickedOptions);
    
            this.setState({
                selectedFields: pickedOptions
            });
        }
    
        render() {
            return (
                <FiltersWidgetComponent
                    {...this.props}
    
                    contexts={this.state.contexts}
    
                    selectedContext={this.state.selectedContext}
                    selectedDimension={this.state.selectedDimension}
                    selectedFields={this.state.selectedFields}
    
                    onSelectContext={this.onContextChange.bind(this)}
                    onDimensionsSelect={this.onDimensionChange.bind(this)}
                    onFieldChange={this.onFieldChange.bind(this)}
                />
            );
        }
    }
    
    FiltersWidget.propTypes = {
        contexts: PropTypes.arrayOf(PropTypes.instanceOf(Context)),
        onSelectContext: PropTypes.func,
        onDimensionsSelect: PropTypes.func,
        onFieldChange: PropTypes.func
    };
    
    return FiltersWidget;
}

