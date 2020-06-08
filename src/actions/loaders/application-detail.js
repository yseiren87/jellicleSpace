import {
    APPLICATION_DETAIL_PAGE__LOADING,
    APPLICATION_DETAIL_PAGE__LOADING_INVALID,
    APPLICATION_DETAIL_PAGE__LOADING_ERROR,
} from "../../keys";
import {getRequestAction} from "../../utils";
import sf from "sf";

export const applicationDetailPageLoading = (_appId) => getRequestAction({
    _url: sf("/service/application/{0}/info/", _appId),
    _hasUserId: true,
    _hasUserToken: true,

    _typename: APPLICATION_DETAIL_PAGE__LOADING,
    _invalidTypename: APPLICATION_DETAIL_PAGE__LOADING_INVALID,
    _errorTypename: APPLICATION_DETAIL_PAGE__LOADING_ERROR,
});