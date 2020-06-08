import {Codes} from "./constants";

export const passwordVerification = ({_password, _username}) => {
    if (_password === "") return Codes.INVALID_BLANK;

    if (_password === _username) return Codes.INVALID_EQUAL;

    return Codes.VALID_AVAIL;
}

export const passwordCheckVerification = ({_passwordCheck, _password}) => {
    if (_passwordCheck === "") return Codes.INVALID_BLANK;

    if (_passwordCheck !== _password) return Codes.INVALID_NOT_EQUAL;

    return Codes.VALID_AVAIL;
}

export const newPasswordVerification = ({_newPassword, _password}) => {
    if (_newPassword === "") return Codes.INVALID_BLANK;

    if (_newPassword === _password) return Codes.INVALID_EQUAL2;

    return Codes.VALID_AVAIL;
}
