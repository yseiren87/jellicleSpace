import {
    PROFILE_PAGE__LOADING,
    PROFILE_PAGE__LOADING_INVALID,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS_INVALID,

    PROFILE_PAGE__INIT,
    PROFILE_PAGE__CHANGING_USERNAME,
    PROFILE_PAGE__CHANGING_EMAIL,
    PROFILE_PAGE__CHANGING_EXIT_APPROVAL,

    PROFILE_PAGE__VALIDATING__USERNAME_IS_BLANK,
    PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_CHANGED,
    PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED,
    PROFILE_PAGE__VALIDATING__FORM_BLANK,
    PROFILE_PAGE__RESET,

    PROFILE_PAGE__VERIFYING_USERNAME,
    PROFILE_PAGE__VERIFYING_USERNAME_INVALID,

    PROFILE_PAGE__UPDATE,
    PROFILE_PAGE__UPDATE_INVALID,

    PROFILE_PAGE__EXIT_INVALID,
} from "../keys";
import {
    emailVerification,
    Codes
} from "../utils";

const initState = {
    loaded: false,

    username: "",
    usernameCode: null,
    usernamePrev: "",

    email: "",
    emailCode: null,
    emailPrev: "",

    applicationList: null,

    exitApproval: false,

    pageCode: null,
}

export const profileReducer = (state = initState, action) => {
    let usernameCode = null, emailCode = null;

    switch (action.type) {
        case PROFILE_PAGE__LOADING:
            return {
                ...state,
                loaded: true,

                username: action.value.username,
                usernamePrev: action.value.username,

                email: action.value.email,
                emailPrev: action.value.email,

                pageCode: null
            };

        case PROFILE_PAGE__LOADING_USING_APPLICATIONS:
            return {
                ...state,
                applicationList: action.value.applicationList
            }

        case PROFILE_PAGE__LOADING_INVALID:
        case PROFILE_PAGE__LOADING_USING_APPLICATIONS_INVALID:
        case PROFILE_PAGE__EXIT_INVALID:
            return {
                ...state,
                pageCode: action.value
            }

        case PROFILE_PAGE__INIT:
            return {
                ...state,
                ...initState
            };

        case PROFILE_PAGE__CHANGING_USERNAME:
            usernameCode = (action.value === "") ? Codes.INVALID_BLANK : null;

            return {
                ...state,
                username: action.value,
                usernameCode: usernameCode,

                pageCode: null
            }

        case PROFILE_PAGE__CHANGING_EMAIL:
            emailCode = (action.value === state.emailPrev) ? null : emailVerification(action.value);

            return {
                ...state,
                email: action.value,
                emailCode: emailCode,

                pageCode: null
            }

        case PROFILE_PAGE__CHANGING_EXIT_APPROVAL:
            return {
                ...state,
                exitApproval: !state.exitApproval
            }

        case PROFILE_PAGE__VALIDATING__USERNAME_IS_BLANK:
            return {
                ...state,
                usernameCode: Codes.INVALID_BLANK,
                pageCode: null
            };

        case PROFILE_PAGE__VALIDATING__FORM_BLANK:
            usernameCode = (state.username === "") ? Codes.INVALID_BLANK : state.usernameCode;
            emailCode = (state.email === "") ? Codes.INVALID_BLANK : state.emailCode;

            return {
                ...state,
                usernameCode: usernameCode,
                emailCode: emailCode,

                pageCode: null
            };

        case PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED:
            return {
                ...state,
                usernameCode: Codes.INVALID_VERIFIED,

                pageCode: null
            };

        case PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_CHANGED:
            return {
                ...state,
                usernameCode: Codes.VALID_NOT_CHANGED,

                pageCode: null
            }

        case PROFILE_PAGE__RESET:
            return {
                ...state,
                username: state.usernamePrev,
                usernameCode: null,

                email: state.emailPrev,
                emailCode: null,

                pageCode: null,
            }

        case PROFILE_PAGE__VERIFYING_USERNAME_INVALID:
        case PROFILE_PAGE__VERIFYING_USERNAME:
            return {
                ...state,
                usernameCode: action.value.code,
                pageCode: null
            };

        case PROFILE_PAGE__UPDATE:
            return {
                ...state,
                pageCode: null,

                usernamePrev: state.username,
                emailPrev: state.email
            };

        case PROFILE_PAGE__UPDATE_INVALID:
            return {
                ...state,
                usernameCode: action.value.code.username,
                emailCode: action.value.code.email,

                pageCode: action.value
            };

        default:
            return state;
    }
}
