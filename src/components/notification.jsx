import React from 'react';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';

let Notification = React.createClass({

    getInitialState() {

        return {

            show: false
        };
    },

    componentWillReceiveProps (nextProps) {

        if (nextProps.code) {

            this.setState({ show: true }, () => {

                setTimeout(() => this.setState({ show: false }), 2000);
            });
        }
    },

    render() {

        let notify = this.state.show ?
            <div className='message'>{'Ooops! ' + this.props.code}</div> : null;

        return (
            <div className='notification'>{notify}</div>
        );
    }

});

export default Notification;
