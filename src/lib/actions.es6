import Dispatcher from '../dispatchers/dispatcher';

let Actions = {

    _dispatch (action) {

        return new Promise((resolve, reject) => {

            action.promise = { resolve, reject };

            Dispatcher.dispatch(action);
        });
    }
};

export default Actions;
