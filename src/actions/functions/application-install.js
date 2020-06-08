import {
    APPLICATION_PAGE__INSTALL,
    APPLICATION_PAGE__INSTALL_INVALID,
    APPLICATION_PAGE__INSTALL_ERROR,

    APPLICATION_DETAIL_PAGE__INSTALL,
    APPLICATION_DETAIL_PAGE__INSTALL_INVALID,
    APPLICATION_DETAIL_PAGE__INSTALL_ERROR,
} from "../../keys";
import {postRequestAction} from "../../utils";

const install = ({_appId, _typename, _invalidTypename, _errorTypename}) => postRequestAction({
    _url: "/service/application/install/",
    _params: {appId: _appId},
    _hasUserToken: true,
    _hasUserId: true,

    _typename: _typename,
    _invalidTypename: _invalidTypename,
    _errorTypename: _errorTypename
})

export const applicationInstall = (_appId) => install({
    _appId: _appId,

    _typename: APPLICATION_PAGE__INSTALL,
    _invalidTypename: APPLICATION_PAGE__INSTALL_INVALID,
    _errorTypename: APPLICATION_PAGE__INSTALL_ERROR
});

export const applicationDetailInstall = (_appId) => install({
    _appId: _appId,

    _typename: APPLICATION_DETAIL_PAGE__INSTALL,
    _invalidTypename: APPLICATION_DETAIL_PAGE__INSTALL_INVALID,
    _errorTypename: APPLICATION_DETAIL_PAGE__INSTALL_ERROR
});