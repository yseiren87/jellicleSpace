import {
    APPLICATION_DETAIL_PAGE__LOADING,
    APPLICATION_DETAIL_PAGE__LOADING_INVALID,

    APPLICATION_DETAIL_PAGE__INIT,

    APPLICATION_DETAIL_PAGE__INSTALL,
    APPLICATION_DETAIL_PAGE__INSTALL_INVALID,

    APPLICATION_DETAIL_PAGE__UNINSTALL,
    APPLICATION_DETAIL_PAGE__UNINSTALL_INVALID
} from "../keys";

const initState = {
    loaded: false,

    appId: "",
    name: "",
    description: "",
    url: "",
    iconUrl: "",
    previewImageUrl: "",
    publishDate: "",
    installed: false,

    pageCode: null,
}

export const applicationDetailReducer = (state = initState, action) => {

    switch (action.type) {
        case APPLICATION_DETAIL_PAGE__LOADING:
            return {
                ...state,
                loaded: true,

                appId: action.value.appId,
                name: action.value.name,
                description: action.value.description,
                url: action.value.url,
                iconUrl: action.value.iconUrl,
                previewImageUrl: action.value.previewImageUrl,
                publishDate: action.value.publishDate,
                installed: action.value.installed,

                pageCode: null
            }

        case APPLICATION_DETAIL_PAGE__LOADING_INVALID:
        case APPLICATION_DETAIL_PAGE__INSTALL_INVALID:
        case APPLICATION_DETAIL_PAGE__UNINSTALL_INVALID:
            return {
                ...state,
                pageCode: action.value
            }

        case APPLICATION_DETAIL_PAGE__INIT:
            return initState;

        case APPLICATION_DETAIL_PAGE__INSTALL:
            return {
                ...state,
                installed: true
            }

        case APPLICATION_DETAIL_PAGE__UNINSTALL:
            return {
                ...state,
                installed: false
            }

        default:
            return state;
    }

};