import {
    JOIN_PAGE__VERIFYING_USERNAME,
    JOIN_PAGE__VERIFYING_USERNAME_INVALID,
    JOIN_PAGE__VERIFYING_USERNAME_ERROR,

    PROFILE_PAGE__VERIFYING_USERNAME,
    PROFILE_PAGE__VERIFYING_USERNAME_INVALID,
    PROFILE_PAGE__VERIFYING_USERNAME_ERROR
} from "../../keys";

import {getRequestAction} from "../../utils";

const verifyingUsername = ({_username, _typename, _invalidTypename, _errorTypename}) => getRequestAction({
    _url: "/service/user/verifying/username/",
    _params: {username:_username},

    _typename: _typename,
    _invalidTypename: _invalidTypename,
    _errorTypename: _errorTypename
});


export const joinPageVerifyingUsername = (username) => verifyingUsername({
    _username: username,
    _typename: JOIN_PAGE__VERIFYING_USERNAME,
    _invalidTypename: JOIN_PAGE__VERIFYING_USERNAME_INVALID,
    _errorTypename: JOIN_PAGE__VERIFYING_USERNAME_ERROR
})

export const profilePageVerifyingUsername = (username) => verifyingUsername({
    _username: username,
    _typename: PROFILE_PAGE__VERIFYING_USERNAME,
    _invalidTypename: PROFILE_PAGE__VERIFYING_USERNAME_INVALID,
    _errorTypename: PROFILE_PAGE__VERIFYING_USERNAME_ERROR
})
