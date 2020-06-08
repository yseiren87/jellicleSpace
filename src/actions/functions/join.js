import {
    JOIN_PAGE__JOIN,
    JOIN_PAGE__JOIN_INVALID,
    JOIN_PAGE__JOIN_ERROR
} from "../../keys";
import {
    postRequestAction,
    ParameterKeys
} from "../../utils";
import cookie from "react-cookies";

export const join = ({username, email, password, passwordCheck}) => postRequestAction({
    _url: "/service/user/join/",
    _params: {username, email, password, passwordCheck},

    _typename: JOIN_PAGE__JOIN,
    _invalidTypename: JOIN_PAGE__JOIN_INVALID,
    _errorTypename: JOIN_PAGE__JOIN_ERROR,

    _action: (data) => {
        cookie.save(ParameterKeys.USER_ID, data[ParameterKeys.USER_ID], {path: "/"});
        cookie.save(ParameterKeys.SESSION_ID, data[ParameterKeys.SESSION_ID], {path: "/"});
    },
});
