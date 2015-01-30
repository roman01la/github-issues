import GitHubAPI from '../api/github-api';

import Store from './store';
import Constants from '../constants/app-constants';

let IssuesStore = new Store({

    _state: {

        issues: []
    }
});

IssuesStore.handleAction(function (action) {

    switch (action.actionType) {

        case Constants.FETCH_ISSUES:

            let id = this.registerAction({

                [Constants.FETCH_ISSUES_SUCCESS]: action.promise.resolve,
                [Constants.FETCH_ISSUES_ERROR]: action.promise.reject
            });

            GitHubAPI.fetchIssues(id, action.payload);
            break;

        case Constants.FETCH_ISSUES_SUCCESS:

            let nextState = { issues: action.payload.response };

            IssuesStore.update(nextState, action.id, Constants.FETCH_ISSUES_SUCCESS);
            break;

        case Constants.PAGINATE_SUCCESS:

            let nextState = { issues: action.payload.response };

            IssuesStore.update(nextState);
            break;
    }
});

export default IssuesStore;
