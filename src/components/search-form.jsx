import React from 'react';

import AppActions from '../actions/app-actions';

import ReposStore from '../stores/repos-store';
import UserStore from '../stores/user-store';
import IssuesStore from '../stores/issues-store';
import PaginationStore from '../stores/pagination-store';

import Dropdown from './dropdown';
import Button from './button';
import Input from './input';

let SearchForm = React.createClass({

    _prev: {

        repoName: ''
    },

    getInitialState() {

        return {

            user: {

                userName: '',
                repoName: ''
            },

            matchedRepos: [],
            showDropdown: false,
            enterDropdown: false,
            repoSelected: false,
            loading: false
        };
    },

    componentDidUpdate (prevProps, { user: { userName, repoName } }) {

        let user = this.state.user;

        if (userName !== user.userName ||
            repoName !== user.repoName) {

            AppActions.updateUser(user);
        }
    },

    _updateUser() {

        return new Promise((resolve, reject) => {

            this.setState({ user: {

                userName: this.refs.userName.getValue(),
                repoName: this.refs.repoName.getValue()
            } }, resolve);
        });
    },

    _matchRepos() {

        let repoName = this.state.user.repoName;

        return repoName ?

            ReposStore.getState().repos
                .map(repo => repo.name)
                .filter(name => name.startsWith(repoName)) :

            [];
    },

    _onNameChange() {

        this._updateUser();
    },

    _onRepoChange() {

        this._updateUser()
            .then(() => {

                let nextState = { matchedRepos: this._matchRepos() };

                !this.state.showDropdown &&
                    (nextState.showDropdown = true);

                this.setState(nextState);
            });
    },

    _onRepoFocus() {

        let userName = this.state.user.userName;

        if (userName !== this._prev.repoName) {

            this.setState({ loading: true });

            this._prev.repoName = userName;
            AppActions.fetchRepos(userName)
                .then(() => this.setState({

                    showDropdown: true,
                    matchedRepos: this._matchRepos(),
                    loading: false
                }));

        } else {

            !this.state.showDropdown && this.setState({ showDropdown: true });
        }

        if (this.state.repoSelected && this.state.showDropdown) {

            this.setState({

                showDropdown: false,
                repoSelected: false
            });
        }
    },

    _onRepoBlur() {

        !this.state.enterDropdown && this.setState({ showDropdown: false });
    },

    _onRepoKeyDown (event) {

        if (event.keyCode === 40) {

            event.preventDefault();

            this.setState({ enterDropdown: true });
        }
    },

    _focusToRepoName() {

        this.setState({ enterDropdown: false}, () => {

            this.refs.repoName.refs.input.getDOMNode().focus();
        });
    },

    _onItemSelect (index) {

        let repoName = this.state.matchedRepos[index];

        this.refs.repoName.refs.input.getDOMNode().value = repoName;

        this._updateUser()
            .then(() => {

                this.setState({ repoSelected: true }, () => {

                    this._focusToRepoName();

                    this._submitForm();
                });
            });
    },

    _onSubmit (event) {

        event.preventDefault();

        this._submitForm();
    },

    _submitForm() {

        return AppActions.submitForm(UserStore.getState(), PaginationStore.getState())
                .then(() => AppActions.setRepo(this.state.user.repoName));
    },

    render() {

        let loader = <span className='fa fa-spinner'></span>;

        let dropdown = (

            <Dropdown className='repos-list'
                      repos={this.state.matchedRepos}
                      enter={this.state.enterDropdown}
                      out={this._focusToRepoName}
                      select={this._onItemSelect} />
        );

        dropdown = this.state.matchedRepos.length && this.state.showDropdown ?
            dropdown : null;

        return (

            <form ref='form' className='search-form' onSubmit={this._onSubmit}>

                <Input ref='userName'
                       label='GitHub username'
                       value={this.state.user.userName}
                       onChange={this._onNameChange}
                       required />

                <Input ref='repoName'
                       label='Repository name'
                       value={this.state.user.repoName}
                       onChange={this._onRepoChange}
                       onFocus={this._onRepoFocus}
                       onBlur={this._onRepoBlur}
                       onKeyDown={this._onRepoKeyDown}
                       required>

                    {this.state.loading ? loader : null}
                    {dropdown}

                </Input>

                <Button type='submit'>List issues</Button>

            </form>
        );
    }
});

export default SearchForm;
