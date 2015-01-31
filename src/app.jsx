import React from 'react';

import ReposStore from './stores/repos-store';
import IssuesStore from './stores/issues-store';

import SearchForm from './components/search-form';
import IssuesList from './components/issues-list';
import Notification from './components/notification';
import RepoInfo from './components/repo-info';

require('../styl/main.styl');

let App = React.createClass({

    getInitialState() {

        return {

            status: ''
        };
    },

    componentDidMount() {

        ReposStore.addChangeListener(this._onChange);
        IssuesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {

        ReposStore.removeChangeListener(this._onChange);
        IssuesStore.removeChangeListener(this._onChange);
    },

    _onChange (status) {

        this.setState({ status });
    },

    render() {

        let repo = ReposStore.getState().selectedRepo;
        let issues = IssuesStore.getState().issues;

        return (

            <div className='app'>

                <section className='top'>
                    <SearchForm />
                    <RepoInfo repo={repo} />
                </section>

                <IssuesList issues={issues} />
                <Notification status={this.state.status} />

            </div>
        );
    }

});

React.render(<App />, document.body);
