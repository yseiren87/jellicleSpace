import {
    JOIN_PAGE__LOADING,

    JOIN_PAGE__INIT,
    JOIN_PAGE__CHANGING_USERNAME,
    JOIN_PAGE__CHANGING_PASSWORD,
    JOIN_PAGE__CHANGING_PASSWORD_CHECK,
    JOIN_PAGE__CHANGING_EMAIL,
    JOIN_PAGE__VALIDATING__FORM_BLANK,
    JOIN_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED,
    JOIN_PAGE__VALIDATING__USERNAME_IS_BLANK,

    JOIN_PAGE__VERIFYING_USERNAME,
    JOIN_PAGE__VERIFYING_USERNAME_INVALID,

    JOIN_PAGE__JOIN_INVALID,
} from "../keys";
import {
    passwordVerification,
    passwordCheckVerification,
    emailVerification,
    Codes
} from "../utils";


const initState = {
    loaded: false,

    username: "",
    usernameCode: null,

    password: "",
    passwordCode: null,

    passwordCheck: "",
    passwordCheckCode: null,

    email: "",
    emailCode: null,

    pageCode: null
};

export const joinReducer = (state = initState, action) => {

    let usernameCode = null, passwordCode = null, passwordCheckCode = null, emailCode = null;

    switch (action.type) {
        case JOIN_PAGE__LOADING:
            return {
                ...state,
                loaded: true,
            };

        case JOIN_PAGE__INIT:
            return {
                ...state,

                usernameCode: null,

                password: "",
                passwordCode: null,

                passwordCheck: "",
                passwordCheckCode: null,

                pageCode: null,
            };

        case JOIN_PAGE__CHANGING_USERNAME:
            usernameCode = (action.value === "") ? Codes.INVALID_BLANK : null;

            passwordCode = (state.password !== "") ? passwordVerification({
                _password: state.password,
                _username: action.value
            }) : state.passwordCode

            return {
                ...state,
                username: action.value,
                usernameCode: usernameCode,

                passwordCode: passwordCode,

                pageCode: null,
            };

        case JOIN_PAGE__CHANGING_PASSWORD:
            passwordCode = passwordVerification({
                _password: action.value,
                _username: state.username
            })

            passwordCheckCode = (state.passwordCheck !== "") ? passwordCheckVerification({
                _passwordCheck: state.passwordCheck,
                _password: action.value,
            }) : state.passwordCheckCode

            return {
                ...state,
                password: action.value,
                passwordCode: passwordCode,

                passwordCheckCode: passwordCheckCode,

                pageCode: null
            }

        case JOIN_PAGE__CHANGING_PASSWORD_CHECK:
            passwordCheckCode = passwordCheckVerification({
                _passwordCheck: action.value,
                _password: state.password
            })

            return {
                ...state,
                passwordCheck: action.value,
                passwordCheckCode: passwordCheckCode,

                pageCode: null
            };

        case JOIN_PAGE__CHANGING_EMAIL:
            emailCode = emailVerification(action.value);

            return {
                ...state,
                email: action.value,
                emailCode: emailCode,

                pageCode: null
            };

        case JOIN_PAGE__VALIDATING__FORM_BLANK:
            usernameCode = (state.username === "") ? Codes.INVALID_BLANK : state.usernameCode;
            passwordCode = (state.password === "") ? Codes.INVALID_BLANK : state.passwordCode;
            passwordCheckCode = (state.passwordCheck === "") ? Codes.INVALID_BLANK : state.passwordCheckCode;
            emailCode = (state.email === "") ? Codes.INVALID_BLANK : state.emailCode;

            return {
                ...state,
                usernameCode: usernameCode,
                passwordCode: passwordCode,
                passwordCheckCode: passwordCheckCode,
                emailCode: emailCode,

                pageCode: null
            };

        case JOIN_PAGE__VALIDATING__USERNAME_IS_BLANK:
            return {
                ...state,
                usernameCode: Codes.INVALID_BLANK,
                pageCode: null
            }

        case JOIN_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED:
            return {
                ...state,
                usernameCode: Codes.INVALID_VERIFIED,

                pageCode: null
            }

        case JOIN_PAGE__VERIFYING_USERNAME_INVALID:
        case JOIN_PAGE__VERIFYING_USERNAME:
            return {
                ...state,
                usernameCode: action.value.code,
                pageCode: null
            };

        case JOIN_PAGE__JOIN_INVALID:
            return {
                ...state,
                usernameCode: action.value.code.username,
                passwordCode: action.value.code.password,
                passwordCheckCode: action.value.code.passwordCheck,
                emailCode: action.value.code.email,

                pageCode: action.value
            };

        default:
            return state;
    }
};