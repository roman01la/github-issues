import React from 'react';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';

let Notification = React.createClass({

    getInitialState() {

        return {

            show: false,
            message: ''
        };
    },

    componentWillReceiveProps ({ status }) {

        if (status) {

            let message = '';

            switch (status) {

                case Constants.FETCH_REPOS_SUCCESS:

                    message = 'Repos fetched successfully!';
                    break;

                case Constants.FETCH_ISSUES_SUCCESS:

                    message = 'Issues fetched successfully!';
                    break;
            }

            this.setState({ show: true, message }, () => {

                setTimeout(() => this.setState({ show: false }), 2000);
            });
        }
    },

    render() {

        let notify = this.state.show ?
            <div className='message'>{this.state.message}</div> : null;

        return (
            <div className='notification'>{notify}</div>
        );
    }

});

export default Notification;
