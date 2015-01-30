import Constants from '../constants/app-constants';

import Actions from '../lib/actions';

let AppActions = {

    fetchRepos (userName) {

        return this._dispatch({

            actionType: Constants.FETCH_REPOS,
            payload: { userName }
        });
    },

    updateUser (userData) {

        return this._dispatch({

            actionType: Constants.UPDATE_USER,
            payload: { userData }
        });
    },

    submitForm (userData, paginationData) {

        return this._dispatch({

            actionType: Constants.FETCH_ISSUES,
            payload: { userData, paginationData }
        });
    },

    paginate (userData, paginationData) {

        return this._dispatch({

            actionType: Constants.PAGINATE,
            payload: { userData, paginationData }
        });
    },

    setPageSize (perPage) {

        return this._dispatch({

            actionType: Constants.SET_PAGE_SIZE,
            payload: { perPage }
        });
    },

    setRepo (repoName) {

        return this._dispatch({

            actionType: Constants.SET_REPO,
            payload: { repoName }
        });
    }
};

Object.assign(AppActions, Actions);

export default AppActions;
