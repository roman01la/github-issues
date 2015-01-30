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

PaginationStore.bindAction(Constants.PAGINATE, action => {

    let id = PaginationStore.registerAction({

        [Constants.PAGINATE_SUCCESS]: action.promise.resolve,
        [Constants.PAGINATE_ERROR]: action.promise.reject
    });

    GitHubAPI.paginate(id, action.payload)
        .then(() => {

            let nextState = action.payload.paginationData;

            PaginationStore.update(nextState, id, Constants.PAGINATE_SUCCESS);
        });
});

export default PaginationStore;
