import React from 'react';

import AppActions from '../actions/app-actions';

import Input from './input';
import Button from './button';

let SearchForm = React.createClass({

    getInitialState() {

        return {

            userName: {
                value: '',
                valid: ''
            },

            repoName: {
                value: '',
                valid: ''
            }
        };
    },

    _onSubmit (event) {

        event.preventDefault();

        this._validate(() => {

            AppActions.updateUser({

                userName: this.state.userName.value,
                repoName: this.state.repoName.value
            });
        });
    },

    _onInputChange() {

        this._validate();
    },

    _validate (callback) {

        let userNameValid, repoNameValid;

        let userName = this.refs.userName.getValue(),
            repoName = this.refs.repoName.getValue();

        userNameValid = userName ? 'success' : 'warning';
        repoNameValid = repoName ? 'success' : 'warning';

        this.setState({

            userName: { valid: userNameValid, value: userName },
            repoName: { valid: repoNameValid, value: repoName }
        }, () => { userName && repoName && callback && callback(); });
    },

    render() {

        return (
            <form className='search-form' onSubmit={this._onSubmit}>

                <Input ref='userName'
                       value={this.state.userName.value}
                       onChange={this._onInputChange}
                       label='GitHub username'
                       required />

                <Input ref='repoName'
                       value={this.state.repoName.value}
                       onChange={this._onInputChange}
                       label='Username repository'
                       required />

                <Button type='submit'>Search</Button>

            </form>
        );
    }

});

export default SearchForm;
