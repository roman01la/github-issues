import GitHubAPI from '../api/github-api';

import Store from './store';
import Constants from '../constants/app-constants';

let PaginationStore = new Store({

    _state: {

        currPage: 1,
        perPage: 10,
        disabled: true
    }
});

PaginationStore.handleAction(function (action) {

    switch (action.actionType) {

        case Constants.PAGINATE:

            let id = this.registerAction({

                [Constants.PAGINATE_SUCCESS]: action.promise.resolve,
                [Constants.PAGINATE_ERROR]: action.promise.reject
            });

            GitHubAPI.paginate(id, action.payload)
                .then(() => {

                    let nextState = action.payload.paginationData;

                    PaginationStore.update(nextState, id, Constants.PAGINATE_SUCCESS);
                });

            break;
    }
});

export default PaginationStore;
