import {
    MAIN_PAGE__LOADING,
    MAIN_PAGE__LOADING_INVALID,
    MAIN_PAGE__LOADING_ERROR
} from "../../keys";
import {getRequestAction} from "../../utils";

export const mainPageLoading = () => getRequestAction({
    _url: "/service/application/main/",
    _hasUserToken: true,
    _hasUserId: true,

    _typename: MAIN_PAGE__LOADING,
    _invalidTypename: MAIN_PAGE__LOADING_INVALID,
    _errorTypename: MAIN_PAGE__LOADING_ERROR
});