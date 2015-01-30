import GitHubAPI from '../api/github-api';

import Store from '../lib/store';
import Constants from '../constants/app-constants';

let ReposStore = new Store({

    _state: {

        repos: []
    }
});

ReposStore.bindAction(Constants.FETCH_REPOS, action => {

    let id = ReposStore.registerAction({

        [Constants.FETCH_REPOS_SUCCESS]: action.promise.resolve,
        [Constants.FETCH_REPOS_ERROR]: action.promise.reject
    });

    GitHubAPI.fetchRepos(id, action.payload.userName);
});

ReposStore.bindAction(Constants.FETCH_REPOS_SUCCESS, action => {

    let nextState = { repos: action.payload.response };

    ReposStore.update(nextState, action.id, Constants.FETCH_REPOS_SUCCESS);
});

export default ReposStore;
