import {
    PASSWORD_PAGE__LOADING,
    PASSWORD_PAGE__LOADING_INVALID,

    PASSWORD_PAGE__INIT,
    PASSWORD_PAGE__CHANGING_PASSWORD,
    PASSWORD_PAGE__CHANGING_NEW_PASSWORD,
    PASSWORD_PAGE__CHANGING_NEW_PASSWORD_CHECK,
    PASSWORD_PAGE__VALIDATING__FORM_BLANK,

    PASSWORD_PAGE__UPDATE,
    PASSWORD_PAGE__UPDATE_INVALID,
} from "../keys";
import {
    passwordVerification,
    passwordCheckVerification,
    newPasswordVerification,
    Codes
} from "../utils";

const initState = {
    loaded: false,

    username: "",

    password: "",
    passwordCode: null,

    newPassword: "",
    newPasswordCode: null,

    newPasswordCheck: "",
    newPasswordCheckCode: null,

    pageCode: null
};

export const passwordReducer = (state = initState, action) => {
    let passwordCode = null, newPasswordCode = null, newPasswordCheckCode = null;

    switch (action.type) {
        case PASSWORD_PAGE__LOADING:
            return {
                ...state,
                loaded: true,

                username: action.value.username,

                pageCode: null
            };

        case PASSWORD_PAGE__LOADING_INVALID:
            return {
                ...state,
                pageCode: action.value
            }

        case PASSWORD_PAGE__INIT:
        case PASSWORD_PAGE__UPDATE:
            return {
                ...state,

                password: "",
                passwordCode: null,

                newPassword: "",
                newPasswordCode: null,

                newPasswordCheck: "",
                newPasswordCheckCode: null,

                pageCode: null
            };

        case PASSWORD_PAGE__CHANGING_PASSWORD:
            passwordCode = (action.value === "") ? Codes.INVALID_BLANK : null;

            newPasswordCode = (state.newPassword !== "") ? newPasswordVerification({
                _newPassword: state.newPassword,
                _password: action.value
            }) : state.newPasswordCode;

            return {
                ...state,
                password: action.value,
                passwordCode: passwordCode,

                newPasswordCode: newPasswordCode,

                pageCode: null,
            };

        case PASSWORD_PAGE__CHANGING_NEW_PASSWORD:
            newPasswordCode = passwordVerification({
                _password: action.value,
                _username: state.username
            });

            if (newPasswordCode === Codes.VALID_AVAIL) {
                newPasswordCode = newPasswordVerification({
                    _newPassword: action.value,
                    _password: state.password
                });
            }

            newPasswordCheckCode = (state.newPasswordCheck !== "") ? passwordCheckVerification({
                _passwordCheck: state.newPasswordCheck,
                _password: action.value
            }) : state.newPasswordCheck;

            return {
                ...state,

                newPassword: action.value,
                newPasswordCode: newPasswordCode,

                newPasswordCheckCode: newPasswordCheckCode,

                pageCode: null

            };

        case PASSWORD_PAGE__CHANGING_NEW_PASSWORD_CHECK:
            newPasswordCheckCode = passwordCheckVerification({
                _passwordCheck: action.value,
                _password: state.newPassword
            })

            return {
                ...state,

                newPasswordCheck: action.value,
                newPasswordCheckCode: newPasswordCheckCode,

                pageCode: null
            };

        case PASSWORD_PAGE__VALIDATING__FORM_BLANK:
            passwordCode = (state.password === "") ? Codes.INVALID_BLANK : state.passwordCode;
            newPasswordCode = (state.newPassword === "") ? Codes.INVALID_BLANK : state.newPasswordCode;
            newPasswordCheckCode = (state.newPasswordCheck === "") ? Codes.INVALID_BLANK : state.newPasswordCheckCode;

            return {
                ...state,

                passwordCode: passwordCode,
                newPasswordCode: newPasswordCode,
                newPasswordCheckCode: newPasswordCheckCode,

                pageCode: null
            };

        case PASSWORD_PAGE__UPDATE_INVALID:
            passwordCode = (action.value.code.password === undefined) ?
                state.passwordCode : action.value.code.password;

            newPasswordCode = (action.value.code.newPassword === undefined) ?
                state.newPasswordCode : action.value.code.newPassword;

            newPasswordCheckCode = (action.value.code.newPasswordCheck === undefined) ?
                state.newPasswordCheckCode : action.value.code.newPasswordCheck;

            return {
                ...state,
                passwordCode: passwordCode,
                newPasswordCode: newPasswordCode,
                newPasswordCheckCode: newPasswordCheckCode,

                pageCode: action.value
            };

        default:
            return state;
    }
};