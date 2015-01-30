import API from './api';

import Constants from '../constants/app-constants';

let GitHubAPI = {

    fetchIssues (id, payload) {

        let url = this._getIssuesURL(payload);

        return this._fetch.call(this, id, url, {

            SUCCESS: Constants.FETCH_ISSUES_SUCCESS,
            ERROR: Constants.FETCH_ISSUES_ERROR
        });
    },

    paginate (id, payload) {

        let url = this._getIssuesURL(payload);

        return this._fetch.call(this, id, url, {

            SUCCESS: Constants.PAGINATE_SUCCESS,
            ERROR: Constants.PAGINATE_ERROR
        });
    },

    fetchRepos (id, userName) {

        let url = Constants.API_ROOT + 'users/' + userName + '/repos';
        url += '?per_page=9999';

        return this._fetch.call(this, id, url, {

            SUCCESS: Constants.FETCH_REPOS_SUCCESS,
            ERROR: Constants.FETCH_REPOS_ERROR
        });
    },

    _getIssuesURL ({ userData, paginationData }) {

        let { userName, repoName } = userData,
            { currPage, perPage } = paginationData;

        let url = Constants.API_ROOT + 'repos/' + userName + '/' + repoName + '/issues';
        url += '?page=' + currPage + '&per_page=' + perPage;

        return url;
    }
};

Object.assign(GitHubAPI, API);

export default GitHubAPI;
