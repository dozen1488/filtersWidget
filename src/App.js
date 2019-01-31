import React, { Component } from 'react';
import './App.css';
import './commonStyles/scrollbars.less';

import { BaseConnector } from './store/connectors';
import { WorkPanel } from './components';

class App extends Component {
    componentDidMount() {
        this.props.getTables();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-container">
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                    </div>
                    <div className="App-container">
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                        <WorkPanel
                            contexts={this.props.tables}
                        />
                    </div>
                </header>
            </div>
        );
    }
}

export default new BaseConnector().connect(App);
