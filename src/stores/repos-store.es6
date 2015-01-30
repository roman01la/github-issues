import GitHubAPI from '../api/github-api';

import Store from './store';
import Constants from '../constants/app-constants';

let ReposStore = new Store({

    _state: {

        repos: []
    }
});

ReposStore.handleAction(function (action) {

    switch (action.actionType) {

        case Constants.FETCH_REPOS:

            let id = this.registerAction({

                [Constants.FETCH_REPOS_SUCCESS]: action.promise.resolve,
                [Constants.FETCH_REPOS_ERROR]: action.promise.reject
            });

            GitHubAPI.fetchRepos(id, action.payload.userName);
            break;

        case Constants.FETCH_REPOS_SUCCESS:

            let nextState = { repos: action.payload.response };

            ReposStore.update(nextState, action.id, Constants.FETCH_REPOS_SUCCESS);
            break;
    }
});

export default ReposStore;
