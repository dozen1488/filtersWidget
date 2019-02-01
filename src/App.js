import React, { Component } from 'react';

import { START_PAGE_BARS_NUMBER, START_PAGE_PANELS_IN_BAR_NUMBER } from './constants/config';
import './App.css';
import './commonStyles/scrollbars.less';

import { PANEL_STATES } from './constants/componentStateTypes';
import internalStorageRepository from './repositories/internalStorageRepository';
import { BaseConnector } from './store/connectors';
import { WorkPanel } from './components';

class App extends Component {
    constructor(...args) {
        super(...args);
        this.panelRefs = [];
        this.state = {
            restoredData: []
        }
    }

    componentDidMount() {
        this.props.getTables();

        window.addEventListener('beforeunload', this.saveStatesToLocalStorage.bind(this));
        this.restoreStatesToLocalStorage();
    }

    saveStatesToLocalStorage() {
        // TODO: implement with automapper
        const serializedData = JSON.stringify(this.saveFiltersState());

        internalStorageRepository.saveDataToLocalStorage(serializedData, PANEL_STATES);
    }

    restoreStatesToLocalStorage() {
        const serializedData = internalStorageRepository.restoreDataFromLocalStorage(PANEL_STATES);
        const stateData = JSON.parse(serializedData);

        this.setState({ restoredData: stateData });
    }

    saveFiltersState() {
        return this.panelRefs.map(ref => ref.saveState());
    }

    saveWorkPanelRef(panelIndex, ref) {
        this.panelRefs[panelIndex] = ref;
    }

    renderPanels() {
        return new Array(START_PAGE_BARS_NUMBER)
            .fill(0)
            .map((none, barIndex) => 
                <div className="App-container" key={barIndex}>{
                    new Array(START_PAGE_PANELS_IN_BAR_NUMBER)
                        .fill(0)
                        .map((none, index) => <WorkPanel
                            contexts={this.props.tables}
                            key={index + (!!this.state.restoredData.length) * START_PAGE_PANELS_IN_BAR_NUMBER * START_PAGE_BARS_NUMBER}
                            defaultState={this.state.restoredData[index + barIndex * START_PAGE_PANELS_IN_BAR_NUMBER]}
                            ref={this.saveWorkPanelRef.bind(this, index + barIndex * START_PAGE_PANELS_IN_BAR_NUMBER)}
                        />)
                }</div>
            )
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
