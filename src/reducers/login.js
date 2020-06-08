import {
    LOGIN_PAGE__LOADING,

    LOGIN_PAGE__INIT,

    LOGIN_PAGE__CHANGING_PASSWORD,
    LOGIN_PAGE__CHANGING_USERNAME,

    LOGIN_PAGE__VALIDATING__FORM_BLANK,

    LOGIN_PAGE__LOGIN_INVALID,
} from "../keys";
import {Codes} from "../utils";

const initState = {
    loaded: false,

    username: "",
    usernameCode: null,

    password: "",
    passwordCode: null,

    pageCode: null,
}

export const loginReducer = (state = initState, action) => {

    let usernameCode = null, passwordCode = null;

    switch (action.type) {

        case LOGIN_PAGE__LOADING:
            return {
                ...state,
                loaded: true,
            };

        case LOGIN_PAGE__INIT:
            return {
                ...state,
                password: "",
                passwordCode: null,

                pageCode: null,
            };


        case LOGIN_PAGE__CHANGING_USERNAME:
            usernameCode = (action.value === "") ? Codes.INVALID_BLANK : null;

            return {
                ...state,
                username: action.value,
                usernameCode: usernameCode,

                pageCode: null
            };

        case LOGIN_PAGE__CHANGING_PASSWORD:
            passwordCode = (action.value === "") ? Codes.INVALID_BLANK : null;

            return {
                ...state,
                password: action.value,
                passwordCode: passwordCode,

                pageCode: null
            };

        case LOGIN_PAGE__VALIDATING__FORM_BLANK:
            usernameCode = (state.username === "") ? Codes.INVALID_BLANK : null;
            passwordCode = (state.password === "") ? Codes.INVALID_BLANK : null;

            return {
                ...state,
                usernameCode: usernameCode,
                passwordCode: passwordCode,

                pageCode: null
            }

        case LOGIN_PAGE__LOGIN_INVALID:
            return {
                ...state,
                pageCode: action.value,
            };

        default:
            return state;
    }

}