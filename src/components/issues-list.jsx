import React from 'react';

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
        UserStore.addChangeListener(this._fetchIssues);
        PaginationStore.addChangeListener(this._fetchIssues);
    },

    componentWillUnmount() {

        IssuesStore.removeChangeListener(this._onChange);
        UserStore.removeChangeListener(this._fetchIssues);
        PaginationStore.removeChangeListener(this._fetchIssues);
    },

    _fetchIssues() {

        if (UserStore.valid) {

            AppActions.fetchIssues(UserStore.getState(), PaginationStore.getState());
        }
    },

    _onChange() {

        this.setState(IssuesStore.getState());
    },

    render() {

        var issuesList = this.state.issues.map((issue, index) => {

            return <IssueItem key={index} issue={issue} />;
        });

        return (
            <div className='issues'>
                <Pagination minPage={1} minPerPage={1} />
                <table className='list'><tbody>{issuesList}</tbody></table>
            </div>
        );
    }

});

export default IssuesList;
