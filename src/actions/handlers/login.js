import {
    LOGIN_PAGE__INIT,

    LOGIN_PAGE__CHANGING_USERNAME,
    LOGIN_PAGE__CHANGING_PASSWORD,

    LOGIN_PAGE__VALIDATING__FORM_BLANK
} from "../../keys"
import {defaultAction} from "../../utils";

export const loginPageInit = () => defaultAction(LOGIN_PAGE__INIT);

export const loginChangingUsername = (value) => defaultAction(LOGIN_PAGE__CHANGING_USERNAME, value);

export const loginChangingPassword = (value) => defaultAction(LOGIN_PAGE__CHANGING_PASSWORD, value);

export const loginValidatingFormBlank = () => defaultAction(LOGIN_PAGE__VALIDATING__FORM_BLANK);

