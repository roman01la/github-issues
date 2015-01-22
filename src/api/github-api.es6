import fetch from '../utils/fetch';

let GitHubAPI = {

    fetchIssues (url) {

        return fetch(url);
    }
};

export default GitHubAPI;
