import React from 'react';

import Dispatcher from './dispatchers/dispatcher';
import Constants from './constants/app-constants';

import SearchForm from './components/search-form';
import IssuesList from './components/issues-list';
import Notification from './components/notification';

require('../styl/main.styl');

let App = React.createClass({

    getInitialState() {

        return {

            notify: 0
        };
    },

    componentDidMount() {

        Dispatcher.register((action) => {

            switch (action.actionType) {

                case Constants.FETCH_ERROR:

                    this.setState({ notify: action.response });
                    break;
            }
        });
    },

    render() {

        return (
            <div className='app'>
                <SearchForm />
                <IssuesList />
                <Notification code={this.state.notify} />
            </div>
        );
    }

});

React.render(<App />, document.body);
