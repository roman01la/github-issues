import GitHubAPI from '../api/github-api';

import Store from '../lib/store';
import Constants from '../constants/app-constants';

let PaginationStore = new Store({

    _state: {

        currPage: 1,
        perPage: 10,
        disabled: true
    }
});

PaginationStore.bindAction(Constants.PAGINATE, action => {

    let id = PaginationStore.registerAction({

        [Constants.PAGINATE_SUCCESS]: action.promise.resolve,
        [Constants.PAGINATE_ERROR]: action.promise.reject
    });

    GitHubAPI.paginate(id, action.payload)
        .then(() => {

            let nextState = action.payload.paginationData;

            PaginationStore.update(nextState, Constants.PAGINATE_SUCCESS, id);
        });
});

PaginationStore.bindAction(Constants.SET_PAGE_SIZE, action => {

    let id = PaginationStore.registerAction({

        [Constants.SET_PAGE_SIZE_SUCCESS]: action.promise.resolve,
        [Constants.SET_PAGE_SIZE_ERROR]: action.promise.reject
    });

    let nextState = action.payload;

    PaginationStore.update(nextState, Constants.SET_PAGE_SIZE_SUCCESS, id);
});

export default PaginationStore;
