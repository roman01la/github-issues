import React from 'react/addons';

import AppActions from '../actions/app-actions';

import IssuesStore from '../stores/issues-store';
import PaginationStore from '../stores/pagination-store';
import UserStore from '../stores/user-store';
import ReposStore from '../stores/repos-store';

import Input from './input';
import Button from './button';

let Pagination = React.createClass({

    mixins: [React.addons.PureRenderMixin],

    getDefaultProps() {

        return {

            minPage: 1,
            minPerPage: 1
        }
    },

    getInitialState() {

        return PaginationStore.getState();
    },

    componentDidMount() {

        IssuesStore.addChangeListener(this._onUpdate);
    },

    componentWillUnmount() {

        IssuesStore.removeChangeListener(this._onUpdate);
    },

    _onUpdate() {

        this.state.disabled && this.setState({ disabled: false });
    },

    _onChange() {

        this._updatePage({

            currPage: Number(this.refs.currPage.getValue()),
            perPage: Number(this.refs.perPage.getValue())
        });
    },

    _incPage() {

        if (this.state.disabled) { return; }

        this._updatePage({ currPage: this.state.currPage + 1 });
    },

    _decPage() {

        if (this.state.disabled || this.state.currPage === this.props.minPage) { return; }

        this._updatePage({ currPage: this.state.currPage - 1 });
    },

    _updatePage (nextState) {

        this.setState(nextState, () => {

            AppActions.setPageSize(this.state.perPage)
              .then(() => {

                if (Object.keys(ReposStore.getState().selectedRepo).length) {

                  AppActions.paginate(UserStore.getState(), this.state);
                }
              });
        });
    },

    render() {

        return (

            <div className='pagination'>

                <Input ref='perPage'
                       type='number'
                       value={this.state.perPage}
                       min={this.props.minPerPage}
                       label='Issues per page'
                       onChange={this._onChange} />

                <Button className='prev' onClick={this._decPage}>&larr;</Button>

                <Input ref='currPage'
                       type='number'
                       value={this.state.currPage}
                       min={this.props.minPage}
                       label='Page'
                       onChange={this._onChange}
                       disabled={this.state.disabled} />

                <Button className='next' onClick={this._incPage}>&rarr;</Button>

            </div>
        );
    }

});

export default Pagination;
