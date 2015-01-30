import React from 'react';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';
import AppActions from '../actions/app-actions';

import IssuesStore from '../stores/issues-store';
import UserStore from '../stores/user-store';
import PaginationStore from '../stores/pagination-store';

import IssueItem from '../components/issue-item';
import Pagination from '../components/pagination';

let IssuesList = React.createClass({

    getInitialState() {

        return IssuesStore.getState();
    },

    componentDidMount() {

        IssuesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {

        IssuesStore.removeChangeListener(this._onChange);
    },

    _onChange() {

        this.setState(IssuesStore.getState());
    },

    render() {

        let issuesList = this.state.issues.map((issue, index) => {

            return <IssueItem key={index} issue={issue} />;
        });

        return (

            <div className='issues'>
                <Pagination minPage={1} minPerPage={1} />
                <div className='list'>{issuesList}</div>
            </div>
        );
    }

});

export default IssuesList;
