import {
    PROFILE_PAGE__EXIT,
    PROFILE_PAGE__EXIT_INVALID,
    PROFILE_PAGE__EXIT_ERROR,
} from "../../keys";
import {
    deleteRequestAction,
    ParameterKeys
} from "../../utils";
import sf from "sf";
import cookie from "react-cookies";

export const profileExit = () => deleteRequestAction({
    _url: sf("/service/user/{0}/exit/", userInfo[ParameterKeys.USER_ID]),
    _hasUserToken: true,

    _typename: PROFILE_PAGE__EXIT,
    _invalidTypename: PROFILE_PAGE__EXIT_INVALID,
    _errorTypename: PROFILE_PAGE__EXIT_ERROR,

    _action: () => {
        cookie.remove(ParameterKeys.USER_ID, {path: "/"});
        cookie.remove(ParameterKeys.TOKEN_ID, {path: "/"});
    }
});


