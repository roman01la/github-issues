import Store from './store';
import Constants from '../constants/app-constants';

let PaginationStore = new Store({

    _state: {

        currPage: 1,
        perPage: 10,
        disabled: true
    }
});

PaginationStore.handleAction((action) => {

    switch (action.actionType) {

        case Constants.PAGINATE:

            PaginationStore.update(action.paginationData);
            break;
    }
});

export default PaginationStore;
