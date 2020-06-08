import {
    APPLICATION_PAGE__LOADING,
    APPLICATION_PAGE__LOADING_MORE,
    APPLICATION_PAGE__LOADING_INVALID,

    APPLICATION_PAGE__INIT,
    APPLICATION_PAGE__CHANGING_QUERY,

    APPLICATION_PAGE__INSTALL,
    APPLICATION_PAGE__INSTALL_INVALID,

    APPLICATION_PAGE__UNINSTALL,
    APPLICATION_PAGE__UNINSTALL_INVALID,
} from "../keys";

const initState = {
    loaded: false,

    applicationList: null,
    page: 0,
    more: false,
    totalPages: 0,

    query: "",

    pageCode: null,
}

export const applicationReducer = (state = initState, action) => {
    const applicationList = state.applicationList;
    let filter = null, target = null;

    switch (action.type) {
        case APPLICATION_PAGE__LOADING:
            return {
                ...state,
                loaded: true,

                applicationList: action.value.applicationList,
                page: 1,
                more: action.value.more,
                totalPages: action.value.totalPages,

                pageCode: null
            }

        case APPLICATION_PAGE__LOADING_MORE:
            return {
                ...state,
                applicationList: state.applicationList.concat(action.applicationList),
                page: state.page + 1,
                more: action.more,
                totalPages: action.value.totalPages,

                pageCode: null
            }

        case APPLICATION_PAGE__LOADING_INVALID:
        case APPLICATION_PAGE__INSTALL_INVALID:
        case APPLICATION_PAGE__UNINSTALL_INVALID:
            return {
                ...state,
                pageCode: action.value
            }

        case APPLICATION_PAGE__INIT:
            return initState;

        case APPLICATION_PAGE__CHANGING_QUERY:
            return {
                ...state,
                query: action.value,
            }

        case APPLICATION_PAGE__INSTALL:
            filter = applicationList.filter(_item => _item.appId === action.value.appId);
            if (filter.length !== 0) {
                target = filter[0];
                target.installed = true;
            }

            return {
                ...state,
                applicationList: applicationList.slice()
            }

        case APPLICATION_PAGE__UNINSTALL:
            filter = applicationList.filter(_item => _item.appId === action.value.appId);
            if (filter.length !== 0) {
                target = filter[0];
                target.installed = false;
            }

            return {
                ...state,
                applicationList: applicationList.slice()
            }

        default:
            return state;
    }

};