import Store from '../lib/store';
import Constants from '../constants/app-constants';

let UserStore = new Store({

    _state: {

        userName: '',
        repoName: ''
    }
});

UserStore.bindAction(Constants.UPDATE_USER, action => {

    let id = UserStore.registerAction({

        [Constants.UPDATE_USER_SUCCESS]: action.promise.resolve,
        [Constants.UPDATE_USER_ERROR]: action.promise.reject
    });

    let nextState = action.payload.userData;

    UserStore.update(nextState, id, Constants.UPDATE_USER_SUCCESS);
});

export default UserStore;
