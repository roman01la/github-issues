import fetch from '../utils/fetch';

import Dispatcher from '../dispatchers/dispatcher';

let API = {

    _fetch (id, url, { SUCCESS, ERROR }) {

        return new Promise((resolve, reject) => {

            fetch(url).then((response) => {

                    this._dispatch({

                        id,
                        actionType: SUCCESS,
                        payload: { response }
                    });

                    resolve(id);
                })
                .catch((error) => {

                    this._dispatch({

                        id,
                        actionType: ERROR,
                        payload: { error }
                    });

                    reject(id);
                });
        });
    },

    _dispatch (action) {

        Dispatcher.dispatch(action);
    }
};

export default API;
