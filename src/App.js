import React, { Component } from 'react';

import { START_PAGE_PANELS_IN_BAR_NUMBER } from './constants/config';
import './App.css';
import './commonStyles/scrollbars.less';

import { BaseConnector } from './store/connectors';
import { WorkPanel } from './components';

class App extends Component {
    componentDidMount() {
        this.props.getTables();

        window.addEventListener('beforeunload', this.saveStatesToLocalStorage.bind(this));
        this.restoreStatesToLocalStorage();
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
                        contextsOptions={this.props.contexts}

                        selectedContextIndex={this.props.workPanels.get(arrayIndex).get('selectedContextIndex')}
                        selectedDimensionIndex={this.props.workPanels.get(arrayIndex).get('selectedDimensionIndex')}
                        selectedFields={this.props.workPanels.get(arrayIndex).get('selectedFields')}
        
                        onSelectContext={this.props.setSelectedContext}
                        onDimensionsSelect={this.props.setDimensionsContext}
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
