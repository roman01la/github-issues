import Store from './store';
import Constants from '../constants/app-constants';

let UserStore = new Store({

    _state: {

        userName: '',
        repoName: ''
    },

    valid: false
});

UserStore.handleAction((action) => {

    switch (action.actionType) {

        case Constants.UPDATE_USER:

            let user = action.userData;

            if (user.userName && user.repoName) {

                UserStore.valid = true;
                UserStore.update(user);
            }

            break;
    }
});

export default UserStore;
