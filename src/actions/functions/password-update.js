import {
    PASSWORD_PAGE__UPDATE,
    PASSWORD_PAGE__UPDATE_INVALID,
    PASSWORD_PAGE__UPDATE_ERROR
} from "../../keys";
import {
    ParameterKeys,
    putRequestAction
} from "../../utils";
import sf from "sf";

export const passwordUpdate = ({password, newPassword, newPasswordCheck}) => putRequestAction({
    _url: sf("/service/user/{0}/password/", userInfo[ParameterKeys.USER_ID]),
    _params: {password, newPassword, newPasswordCheck},
    _hasUserToken: true,

    _typename: PASSWORD_PAGE__UPDATE,
    _invalidTypename: PASSWORD_PAGE__UPDATE_INVALID,
    _errorTypename: PASSWORD_PAGE__UPDATE_ERROR,
});