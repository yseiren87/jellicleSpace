import {
    JOIN_PAGE__INIT,

    JOIN_PAGE__CHANGING_USERNAME,
    JOIN_PAGE__CHANGING_EMAIL,
    JOIN_PAGE__CHANGING_PASSWORD,
    JOIN_PAGE__CHANGING_PASSWORD_CHECK,

    JOIN_PAGE__VALIDATING__FORM_BLANK,
    JOIN_PAGE__VALIDATING__USERNAME_IS_BLANK,
    JOIN_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED,
} from "../../keys"
import {defaultAction} from "../../utils";

export const joinPageInit = () => defaultAction(JOIN_PAGE__INIT);

export const joinChangingUsername = (value) => defaultAction(JOIN_PAGE__CHANGING_USERNAME, value);

export const joinChangingEmail = (value) => defaultAction(JOIN_PAGE__CHANGING_EMAIL, value);

export const joinChangingPassword = (value) => defaultAction(JOIN_PAGE__CHANGING_PASSWORD, value);

export const joinChangingPasswordCheck = (value) => defaultAction(JOIN_PAGE__CHANGING_PASSWORD_CHECK, value);

export const joinValidatingFormBlank = () => defaultAction(JOIN_PAGE__VALIDATING__FORM_BLANK);

export const joinValidatingUsernameIsNotVerified = () => defaultAction(JOIN_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED);

export const joinValidatingUsernameIsBlank = () => defaultAction(JOIN_PAGE__VALIDATING__USERNAME_IS_BLANK);

