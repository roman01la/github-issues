import React from 'react';

import IssueItem from '../components/issue-item';
import Pagination from '../components/pagination';

let IssuesList = React.createClass({

    getDefaultProps() {

        return {

            issues: [],
            pagination: {}
        };
    },

    render() {

        let issuesList = this.props.issues.map((issue, index) => {

            return <IssueItem key={index} issue={issue} />;
        });

        return (

            <div className='issues'>
                <Pagination />
                <div className='list'>{issuesList}</div>
            </div>
        );
    }

});

export default IssuesList;
