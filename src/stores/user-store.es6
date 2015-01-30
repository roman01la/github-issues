import Store from './store';
import Constants from '../constants/app-constants';

let UserStore = new Store({

    _state: {

        userName: '',
        repoName: ''
    }
});

UserStore.handleAction(function (action) {

    switch (action.actionType) {

        case Constants.UPDATE_USER:

            let id = this.registerAction({

                [Constants.UPDATE_USER_SUCCESS]: action.promise.resolve,
                [Constants.UPDATE_USER_ERROR]: action.promise.reject
            });

            let nextState = action.payload.userData;

            UserStore.update(nextState, id, Constants.UPDATE_USER_SUCCESS);
            break;
    }
});

export default UserStore;
