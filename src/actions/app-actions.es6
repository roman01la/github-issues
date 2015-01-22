import GitHubAPI from '../api/github-api';
import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/app-constants';

let AppActions = {

    fetchIssues ({ userName, repoName }, { currPage, perPage }) {

        let url = Constants.API_ROOT + 'repos/' + userName + '/' + repoName + '/issues';
        url += '?page=' + currPage + '&per_page=' + perPage;

        GitHubAPI.fetchIssues(url)
            .then((issues) => {

                this._dispatch({

                    actionType: Constants.FETCH_ISSUES,
                    response: issues
                });
            })
            .catch((error) => {

                this._dispatch({

                    actionType: Constants.FETCH_ISSUES,
                    response: error
                });
            });
    },

    updateUser (userData) {

        this._dispatch({

            actionType: Constants.UPDATE_USER,
            userData
        });
    },

    paginate (paginationData) {

        this._dispatch({

            actionType: Constants.PAGINATE,
            paginationData
        });
    },

    _dispatch (payload) {

        Dispatcher.dispatch(payload);
    }
};

export default AppActions;
