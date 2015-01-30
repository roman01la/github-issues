const Constants = {

    API_ROOT: 'https://api.github.com/',

    CHANGE_EVENT: Symbol('change'),

    FETCH_ISSUES: Symbol('fetch-issues'),
    FETCH_ISSUES_SUCCESS: Symbol('fetch-issues-success'),
    FETCH_ISSUES_ERROR: Symbol('fetch-issues-error'),

    FETCH_REPOS: Symbol('fetch-repos'),
    FETCH_REPOS_SUCCESS: Symbol('fetch-repos-success'),
    FETCH_REPOS_ERROR: Symbol('fetch-repos-error'),

    UPDATE_USER: Symbol('update-user'),
    UPDATE_USER_SUCCESS: Symbol('update-user-success'),
    UPDATE_USER_ERROR: Symbol('update-user-error'),

    PAGINATE: Symbol('paginate'),
    PAGINATE_SUCCESS: Symbol('paginate-success'),
    PAGINATE_ERROR: Symbol('paginate-error'),

    SET_PAGE_SIZE: Symbol('set-page-size'),
    SET_PAGE_SIZE_SUCCESS: Symbol('set-page-size-success'),
    SET_PAGE_SIZE_ERROR: Symbol('set-page-size-error'),

    SET_REPO: Symbol('set-repo')
};

export default Constants;
