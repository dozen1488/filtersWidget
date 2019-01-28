import React, { Component } from 'react';
import './App.css';
import { BaseConnector } from './store/connectors';
import { FiltersWidget } from './components';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <FiltersWidget
                        contexts={this.props.tables}
                        setSelectedContext={this.props.setSelectedContext}
                    />
                </header>
            </div>
        );
    }
}

export default new BaseConnector().connect(App);
