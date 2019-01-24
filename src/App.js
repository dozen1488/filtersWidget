import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BaseConnector } from './store/connectors';
import { FiltersWidget } from './components';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <FiltersWidget
                        contextModels={this.props.tables}
                    />
                </header>
            </div>
        );
    }
}

export default new BaseConnector().connect(App);
