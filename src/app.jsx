import React from 'react';

import SearchForm from './components/search-form';
import IssuesList from './components/issues-list';

require('../styl/main.styl');

let App = React.createClass({

    render() {

        return (
            <div className='app'>
                <SearchForm />
                <IssuesList />
            </div>
        );
    }

});

React.render(<App />, document.body);
