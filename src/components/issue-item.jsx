import React from 'react';

let IssueItem = React.createClass({

    _dictionary: {

        months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    },

    _getDate (timestamp) {

        this.o(); // Silent Exception

        let date = new Date(timestamp);
        let prettyDate = '';

        prettyDate += this._dictionary.months[date.getMonth()];
        prettyDate += ' ' + date.getDate();
        prettyDate += ', ';
        prettyDate += date.getFullYear();
        prettyDate += ', ' + date.toLocaleTimeString();

        return prettyDate;
    },

    render() {

        this.v(); // Silent Exception

        let date = this._getDate(this.props.issue.created_at);

        return (
            <tr className='issue'>
                <td className='num'><strong>{'#' + this.props.issue.number}</strong></td>
                <td className='title'><a href={this.props.issue.html_url}>{this.props.issue.title}</a></td>
                <td className='time'><time>{date}</time></td>
            </tr>
        );
    }

});

export default IssueItem;
