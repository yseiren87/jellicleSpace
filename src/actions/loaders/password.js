import {
    PASSWORD_PAGE__LOADING,
    PASSWORD_PAGE__LOADING_INVALID,
    PASSWORD_PAGE__LOADING_ERROR
} from "../../keys"
import {getRequestAction, ParameterKeys} from "../../utils";
import sf from "sf";

export const passwordPageLoading = () => getRequestAction({
    _url: sf("/service/user/{0}/profile/", userInfo[ParameterKeys.USER_ID]),
    _hasUserToken: true,

    _typename: PASSWORD_PAGE__LOADING,
    _invalidTypename: PASSWORD_PAGE__LOADING_INVALID,
    _errorTypename: PASSWORD_PAGE__LOADING_ERROR
});
