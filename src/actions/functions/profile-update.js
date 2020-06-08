import {
    PROFILE_PAGE__UPDATE,
    PROFILE_PAGE__UPDATE_ERROR,
    PROFILE_PAGE__UPDATE_INVALID
} from "../../keys";
import {
    ParameterKeys,
    putRequestAction
} from "../../utils";
import sf from "sf";

export const profileUpdate = ({username, email}) => putRequestAction({
    _url: sf("/service/user/{0}/profile/", userInfo[ParameterKeys.USER_ID]),
    _params: {username, email},
    _hasUserToken: true,

    _typename: PROFILE_PAGE__UPDATE,
    _invalidTypename: PROFILE_PAGE__UPDATE_INVALID,
    _errorTypename: PROFILE_PAGE__UPDATE_ERROR,
})