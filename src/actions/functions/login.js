import {
    LOGIN_PAGE__LOGIN,
    LOGIN_PAGE__LOGIN_INVALID,
    LOGIN_PAGE__LOGIN_ERROR,
} from "../../keys";
import {
    postRequestAction,
    ParameterKeys
} from "../../utils";
import cookie from "react-cookies";

export const login = ({username, password}) => postRequestAction({
    _url: "/service/user/login/",
    _params: {username, password},

    _typename: LOGIN_PAGE__LOGIN,
    _invalidTypename: LOGIN_PAGE__LOGIN_INVALID,
    _errorTypename: LOGIN_PAGE__LOGIN_ERROR,

    _action: (data) => {
        cookie.save(ParameterKeys.USER_ID, data[ParameterKeys.USER_ID], {path: "/"});
        cookie.save(ParameterKeys.SESSION_ID, data[ParameterKeys.SESSION_ID], {path: "/"});
    }
});
