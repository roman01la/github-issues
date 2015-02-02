import GitHubAPI from '../api/github-api';

import Store from '../lib/store';
import Constants from '../constants/app-constants';

let IssuesStore = new Store({

    _state: {

        issues: []
    }
});

IssuesStore.bindAction(Constants.FETCH_ISSUES, action => {

    let id = IssuesStore.registerAction({

        [Constants.FETCH_ISSUES_SUCCESS]: action.promise.resolve,
        [Constants.FETCH_ISSUES_ERROR]: action.promise.reject
    });

    GitHubAPI.fetchIssues(id, action.payload);
});

IssuesStore.bindAction(Constants.FETCH_ISSUES_SUCCESS, action => {

    let nextState = { issues: action.payload.response };

    IssuesStore.update(nextState, Constants.FETCH_ISSUES_SUCCESS, action.id);
});

IssuesStore.bindAction(Constants.PAGINATE_SUCCESS, action => {

    let nextState = { issues: action.payload.response };

    IssuesStore.update(nextState);
});

export default IssuesStore;
