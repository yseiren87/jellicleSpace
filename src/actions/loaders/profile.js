import {
    PROFILE_PAGE__LOADING,
    PROFILE_PAGE__LOADING_INVALID,
    PROFILE_PAGE__LOADING_ERROR,

    PROFILE_PAGE__LOADING_USING_APPLICATIONS,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS_INVALID,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR
} from "../../keys"
import {getRequestAction} from "../../utils";
import {ParameterKeys} from "../../utils";
import sf from "sf";

export const profilePageLoading = () => getRequestAction({
    _url: sf("/service/user/{0}/profile/", userInfo[ParameterKeys.USER_ID]),
    _hasUserToken: true,

    _typename: PROFILE_PAGE__LOADING,
    _invalidTypename: PROFILE_PAGE__LOADING_INVALID,
    _errorTypename: PROFILE_PAGE__LOADING_ERROR,
});


export const profilePageLoadingUsingApplications = () => getRequestAction({
    _url: sf("/service/user/{0}/application/", userInfo[ParameterKeys.USER_ID]),
    _hasUserToken: true,

    _typename: PROFILE_PAGE__LOADING_USING_APPLICATIONS,
    _invalidTypename: PROFILE_PAGE__LOADING_USING_APPLICATIONS_INVALID,
    _errorTypename: PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR,
})
