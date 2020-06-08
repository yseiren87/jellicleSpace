import {
    PROFILE_PAGE__INIT,

    PROFILE_PAGE__CHANGING_USERNAME,
    PROFILE_PAGE__CHANGING_EMAIL,
    PROFILE_PAGE__CHANGING_EXIT_APPROVAL,

    PROFILE_PAGE__VALIDATING__FORM_BLANK,
    PROFILE_PAGE__VALIDATING__NOTHING_CHANGED,
    PROFILE_PAGE__VALIDATING__USERNAME_IS_BLANK,
    PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_CHANGED,
    PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED,
    PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED,

    PROFILE_PAGE__RESET,
} from "../../keys";

import {defaultAction} from "../../utils";

export const profileInit = () => defaultAction(PROFILE_PAGE__INIT);

export const profileChangingUsername = (value) => defaultAction(PROFILE_PAGE__CHANGING_USERNAME, value);

export const profileChangingEmail = (value) => defaultAction(PROFILE_PAGE__CHANGING_EMAIL, value);

export const profileChangingExitApproval = () => defaultAction(PROFILE_PAGE__CHANGING_EXIT_APPROVAL);

export const profileValidatingUsernameIsNotVerified = () => defaultAction(PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_VERIFIED);

export const profileValidatingUsernameIsBlank = () => defaultAction(PROFILE_PAGE__VALIDATING__USERNAME_IS_BLANK);

export const profileValidatingUsernameIsNotChanged = () => defaultAction(PROFILE_PAGE__VALIDATING__USERNAME_IS_NOT_CHANGED);

export const profileValidatingFormBlank = () => defaultAction(PROFILE_PAGE__VALIDATING__FORM_BLANK);

export const profileValidatingNothingChanged = () => defaultAction(PROFILE_PAGE__VALIDATING__NOTHING_CHANGED);

export const profileValidatingExitApprovalIsNotChecked = () => defaultAction(PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED);

export const profileReset = () => defaultAction(PROFILE_PAGE__RESET);
