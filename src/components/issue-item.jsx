import React from 'react';

import Markdown from './markdown';

let IssueItem = React.createClass({

    getInitialState() {

        return {

            showIssue: false
        };
    },

    _dictionary: {

        months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },

    _getDate (timestamp) {

        let date = new Date(timestamp);
        let prettyDate = '';

        prettyDate += this._dictionary.months[date.getMonth()];
        prettyDate += ' ' + date.getDate();
        prettyDate += ', ';
        prettyDate += date.getFullYear();
        prettyDate += ', ' + date.toLocaleTimeString();

        return prettyDate;
    },

    _toggle (event) {

        if (event.type === 'click' || event.keyCode === 13) {

            event.preventDefault();

            this.setState({ showIssue: !this.state.showIssue });
        }
    },

    render() {

        let date = this._getDate(this.props.issue.created_at);

        let issue = <div className='issue-body'><Markdown md={this.props.issue.body} /></div>;

        return (

            <div className='issue'>

                <div className='issue-info'>

                    <div className='num'><strong>
                        <a href={this.props.issue.html_url} target='blank_'>
                            {'#' + this.props.issue.number}
                        </a>
                    </strong></div>

                    <div className='title'
                         title='toggle'
                         tabIndex='0'
                         onClick={this._toggle}
                         onKeyDown={this._toggle}>{this.props.issue.title}</div>

                    <div className='time'><time>{date}</time></div>

                </div>

                {this.state.showIssue ? issue : null}

            </div>
        );
    }

});

export default IssueItem;
