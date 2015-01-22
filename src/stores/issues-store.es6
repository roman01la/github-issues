import Store from './store';
import Constants from '../constants/app-constants';

let IssuesStore = new Store({

    _state: {

        issues: []
    }
});

IssuesStore.handleAction((action) => {

    switch (action.actionType) {

        case Constants.FETCH_ISSUES:

            IssuesStore.update({ issues: action.response });
            break;
    }
});

export default IssuesStore;
