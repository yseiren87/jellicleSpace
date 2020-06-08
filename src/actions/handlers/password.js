import {
    PASSWORD_PAGE__INIT,

    PASSWORD_PAGE__CHANGING_PASSWORD,
    PASSWORD_PAGE__CHANGING_NEW_PASSWORD,
    PASSWORD_PAGE__CHANGING_NEW_PASSWORD_CHECK,

    PASSWORD_PAGE__VALIDATING__FORM_BLANK,
} from "../../keys"
import {defaultAction} from "../../utils";

export const passwordInit = () => defaultAction(PASSWORD_PAGE__INIT);

export const passwordChangingPassword = (value) => defaultAction(PASSWORD_PAGE__CHANGING_PASSWORD, value);

export const passwordChangingNewPassword = (value) => defaultAction(PASSWORD_PAGE__CHANGING_NEW_PASSWORD, value);

export const passwordChangingNewPasswordCheck = (value) => defaultAction(PASSWORD_PAGE__CHANGING_NEW_PASSWORD_CHECK, value);

export const passwordValidatingFormBlank = () => defaultAction(PASSWORD_PAGE__VALIDATING__FORM_BLANK);
