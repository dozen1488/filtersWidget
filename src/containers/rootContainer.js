import React, { Component } from 'react';

import BaseConnector from './baseConnector';

import { START_PAGE_PANELS_IN_BAR_NUMBER } from '../constants/config';
import { WorkPanel } from '../components';

import './rootContainer.less';

class RootContainer extends Component {
    componentDidMount() {
        this.props.getTables()
            .then(() => {
                this.restoreStatesToLocalStorage();
            });

        window.addEventListener('beforeunload', this.saveStatesToLocalStorage.bind(this));
    }

    saveStatesToLocalStorage() {
        this.props.setSession({
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
            <div className="root-container__container" key={barIndex}>{
                barArray.map((none, index) => {
                    const arrayIndex = START_PAGE_PANELS_IN_BAR_NUMBER * barIndex + index;
                    return (<WorkPanel
                        key={arrayIndex}
                        panelIndex={arrayIndex}
                        contextsOptions={this.props.workPanels.get(arrayIndex).get('contexts')}

                        selectedContexts={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedContexts')}
                        selectedDimensions={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedDimensions')}
                        selectedFields={this.props.workPanels.get(arrayIndex).get('workPanel').get('selectedFields')}
        
                        onContextSelect={this.props.selectContext}
                        onContextsChange={this.props.setSelectedContexts}
                        onDimensionSelect={this.props.selectDimension}
                        onDimensionsChange={this.props.setSelectedDimensions}
                        onFieldsChange={this.props.setSelectedFields}
                    />);
                })
            }</div>
        );
    }

    render() {
        return (
            <div className="root-container">
                <header className="root-container__header">
                    {this.renderPanels()}
                </header>
            </div>
        );
    }
}

export default new BaseConnector().connect(RootContainer);
