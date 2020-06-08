import {
    INIT,
    STATUS_INIT,

    LOGIN_PAGE__LOGIN,
    LOGIN_PAGE__LOGIN_ERROR,

    JOIN_PAGE__VERIFYING_USERNAME_ERROR,
    JOIN_PAGE__JOIN,
    JOIN_PAGE__JOIN_ERROR,

    MAIN_PAGE__LOADING_ERROR,
    MAIN_PAGE__UNINSTALL_ERROR,
    MAIN_PAGE__RUN,

    PROFILE_PAGE__LOADING_ERROR,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR,
    PROFILE_PAGE__VALIDATING__NOTHING_CHANGED,
    PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED,
    PROFILE_PAGE__VERIFYING_USERNAME_ERROR,
    PROFILE_PAGE__UPDATE,
    PROFILE_PAGE__UPDATE_ERROR,
    PROFILE_PAGE__RESET,
    PROFILE_PAGE__EXIT,
    PROFILE_PAGE__EXIT_ERROR,

    PASSWORD_PAGE__LOADING_ERROR,
    PASSWORD_PAGE__UPDATE,
    PASSWORD_PAGE__UPDATE_ERROR,

    APPLICATION_PAGE__LOADING_ERROR,
    APPLICATION_PAGE__INSTALL,
    APPLICATION_PAGE__INSTALL_ERROR,
    APPLICATION_PAGE__UNINSTALL,
    APPLICATION_PAGE__UNINSTALL_ERROR,

    APPLICATION_DETAIL_PAGE__LOADING_ERROR,
    APPLICATION_DETAIL_PAGE__INSTALL,
    APPLICATION_DETAIL_PAGE__INSTALL_ERROR,
    APPLICATION_DETAIL_PAGE__UNINSTALL,
    APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR,
    APPLICATION_DETAIL_PAGE__RUN,
} from "../keys";

const initState = {
    status: INIT,
    error: null,
};

export const systemReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_PAGE__LOGIN:
        case LOGIN_PAGE__LOGIN_ERROR:

        case JOIN_PAGE__VERIFYING_USERNAME_ERROR:
        case JOIN_PAGE__JOIN:
        case JOIN_PAGE__JOIN_ERROR:

        case MAIN_PAGE__LOADING_ERROR:
        case MAIN_PAGE__UNINSTALL_ERROR:
        case MAIN_PAGE__RUN:

        case PROFILE_PAGE__LOADING_ERROR:
        case PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR:
        case PROFILE_PAGE__VALIDATING__NOTHING_CHANGED:
        case PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED:
        case PROFILE_PAGE__RESET:
        case PROFILE_PAGE__VERIFYING_USERNAME_ERROR:
        case PROFILE_PAGE__UPDATE:
        case PROFILE_PAGE__UPDATE_ERROR:
        case PROFILE_PAGE__EXIT:
        case PROFILE_PAGE__EXIT_ERROR:

        case PASSWORD_PAGE__LOADING_ERROR:
        case PASSWORD_PAGE__UPDATE:
        case PASSWORD_PAGE__UPDATE_ERROR:

        case APPLICATION_PAGE__LOADING_ERROR:
        case APPLICATION_PAGE__INSTALL:
        case APPLICATION_PAGE__INSTALL_ERROR:
        case APPLICATION_PAGE__UNINSTALL:
        case APPLICATION_PAGE__UNINSTALL_ERROR:

        case APPLICATION_DETAIL_PAGE__LOADING_ERROR:
        case APPLICATION_DETAIL_PAGE__INSTALL:
        case APPLICATION_DETAIL_PAGE__INSTALL_ERROR:
        case APPLICATION_DETAIL_PAGE__UNINSTALL:
        case APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR:
        case APPLICATION_DETAIL_PAGE__RUN:
            return {
                ...state,
                status: action.type,
                error: (action.error === undefined) ? null : action.error
            };

        case STATUS_INIT:
            return {
                ...state,
                status: INIT,
                error: null
            };

        default:
            return state;
    }
};