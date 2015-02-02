import GitHubAPI from '../api/github-api';

import Store from '../lib/store';
import Constants from '../constants/app-constants';

let ReposStore = new Store({

    _state: {

        repos: [],
        selectedRepo: {}
    }
});

ReposStore.bindAction(Constants.FETCH_REPOS, action => {

    let id = ReposStore.registerAction({

        [Constants.FETCH_REPOS_SUCCESS]: action.promise.resolve,
        [Constants.FETCH_REPOS_ERROR]: action.promise.reject
    });

    GitHubAPI.fetchRepos(action.payload.userName, id);
});

ReposStore.bindAction(Constants.FETCH_REPOS_SUCCESS, action => {

    let nextState = { repos: action.payload.response };

    ReposStore.update(nextState, Constants.FETCH_REPOS_SUCCESS, action.id);
});

ReposStore.bindAction(Constants.SET_REPO, action => {

    let selectedRepo = ReposStore.getState().repos
        .filter(repo => action.payload.repoName === repo.name);

    let nextState = selectedRepo.length === 1 ?
        { selectedRepo: selectedRepo[0] } :
        {};

    ReposStore.update(nextState);
});

export default ReposStore;
