import React, { Component } from 'react';

import { START_PAGE_PANELS_IN_BAR_NUMBER } from './constants/config';

import { BaseConnector } from './store/connectors';
import { WorkPanel } from './components';

import './commonStyles/scrollbars.less';
import './App.less';

class App extends Component {
    componentDidMount() {
        this.props.getTables()
            .then(() => {
                this.restoreStatesToLocalStorage();
            });

        window.addEventListener('beforeunload', this.saveStatesToLocalStorage.bind(this));
    }

    saveStatesToLocalStorage() {
        this.props.setSession({
            contexts: this.props.contexts.toJS(),
            workPanels: this.props.workPanels.toJS()
        });
    }

    restoreStatesToLocalStorage() {
        this.props.getSession();
    }

    renderPanels() {
        const panelsArray = this.props.workPanels.toArray();
        return [
            panelsArray.slice(0, START_PAGE_PANELS_IN_BAR_NUMBER),
            panelsArray.slice(START_PAGE_PANELS_IN_BAR_NUMBER, panelsArray.length)
        ].map((barArray, barIndex) => 
            <div className="App-container" key={barIndex}>{
                barArray.map((none, index) => {
                    const arrayIndex = START_PAGE_PANELS_IN_BAR_NUMBER * barIndex + index;
                    return (<WorkPanel
                        key={arrayIndex}
                        panelIndex={arrayIndex}
                        contextsOptions={this.props.workPanels.get(arrayIndex).get('contexts')}

                        selectedContextIndex={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedContextIndex')}
                        selectedDimensionIndex={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedDimensionIndex')}
                        selectedFields={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedFields')}
        
                        onSelectContext={this.props.selectContext}
                        onDimensionsSelect={this.props.selectDimension}
                        onFieldChange={this.props.setFieldsContext}
                    />);
                })
            }</div>
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.renderPanels()}
                </header>
            </div>
        );
    }
}

export default new BaseConnector().connect(App);
