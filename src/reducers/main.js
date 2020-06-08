import {
    MAIN_PAGE__LOADING,
    MAIN_PAGE__LOADING_INVALID,

    MAIN_PAGE__INIT,
    MAIN_PAGE__RUN,

    MAIN_PAGE__UNINSTALL,
    MAIN_PAGE__UNINSTALL_INVALID,
} from "../keys";

const initState = {
    loaded: false,

    applicationList: null,
    appUrl: null,

    pageCode: null,
}

export const mainReducer = (state = initState, action) => {
    const applicationList = state.applicationList;

    switch (action.type) {
        case MAIN_PAGE__LOADING:
            return {
                ...state,
                loaded: true,

                applicationList: action.value.applicationList,

                pageCode: null
            }

        case MAIN_PAGE__LOADING_INVALID:
        case MAIN_PAGE__UNINSTALL_INVALID:
            return {
                ...state,
                pageCode: action.value
            };

        case MAIN_PAGE__INIT:
            return initState;

        case MAIN_PAGE__RUN:
            return {
                ...state,
                appUrl: action.value
            };

        case MAIN_PAGE__UNINSTALL:
            return {
                ...state,
                applicationList: applicationList.filter(_item => _item.appId !== action.value.appId)
            }

        default:
            return state;
    }
};