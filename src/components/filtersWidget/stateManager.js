import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import Context from '../../domain/models/context';
import './filtersWidget.less';

export default (FiltersWidgetComponent) => {
    class FiltersWidget extends PureComponent {
        constructor(...args) {
            super(...args);
    
            const [ props ] = args;
    
            this.state = {
                contexts: props.contexts,
                selectedContexts: null,
                selectedDimensions: null,
                selectedFields: []
            };
        }
    
        saveState() {
            const selectedContexts = this.state.contexts.indexOf(this.state.selectedContext);
            const selectedDimensions = this.state.selectedContext && this.state.selectedContext.dimensions.indexOf(this.state.selectedDimension);
    
            return {
                hash: this.state.contexts.map(c => c.id).toString(),
                selectedContexts: ~(selectedContexts)
                    ? selectedContexts
                    : null,
                selectedDimensions: ~(selectedDimensions)
                    ? selectedDimensions
                    : null,
                selectedFields: this.state.selectedFields
            }
        }
    
        onContextChange(data) {
            if (this.props.onSelectContext) this.props.onSelectContext(data.value);
    
            this.setState({
                selectedContexts: data.value,
                selectedDimensions: null
            });
        }
    
        onDimensionChange(data) {
            if (this.props.onDimensionsSelect) this.props.onDimensionsSelect(data.value);
    
            this.setState({
                selectedDimensions: data.value
            });
        }
    
        onFieldsChange(pickedOptions) {
            if (this.props.onFieldsChange) this.props.onFieldsChange(pickedOptions);
    
            this.setState({
                selectedFields: pickedOptions
            });
        }
    
        render() {
            // Todo: fix this part
            return (
                <FiltersWidgetComponent
                    {...this.props}

                    contextsOptions={this.state.contexts}
                    dimensionsOptions={(this.state.selectedContext && this.state.selectedContext.dimensions) || []}
                    fieldsOptions={(this.state.selectedDimension && this.state.selectedDimension.fields) || []}
                
                    selectedContext={this.state.selectedContext}
                    selectedDimension={this.state.selectedDimension}
                    selectedFields={this.state.selectedFields}
    
                    onSelectContext={this.onContextChange.bind(this)}
                    onDimensionsSelect={this.onDimensionChange.bind(this)}
                    onFieldsChange={this.onFieldsChange.bind(this)}
                />
            );
        }
    }
    
    FiltersWidget.propTypes = {
        contexts: PropTypes.arrayOf(PropTypes.instanceOf(Context)),

        onSelectContext: PropTypes.func,
        onDimensionsSelect: PropTypes.func,
        onFieldsChange: PropTypes.func
    };
    
    return FiltersWidget;
}

