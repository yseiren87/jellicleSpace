import {
    APPLICATION_PAGE__UNINSTALL,
    APPLICATION_PAGE__UNINSTALL_INVALID,
    APPLICATION_PAGE__UNINSTALL_ERROR,

    APPLICATION_DETAIL_PAGE__UNINSTALL,
    APPLICATION_DETAIL_PAGE__UNINSTALL_INVALID,
    APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR,

    MAIN_PAGE__UNINSTALL,
    MAIN_PAGE__UNINSTALL_INVALID,
    MAIN_PAGE__UNINSTALL_ERROR
} from "../../keys";
import {deleteRequestAction} from "../../utils";

const uninstall = ({_appId, _typename, _invalidTypename, _errorTypename}) => deleteRequestAction({
    _url: "/service/application/uninstall/",
    _params: {appId: _appId},
    _hasUserToken: true,
    _hasUserId: true,

    _typename: _typename,
    _invalidTypename: _invalidTypename,
    _errorTypename: _errorTypename
})

export const applicationUninstall = (_appId) => uninstall({
    _appId: _appId,

    _typename: APPLICATION_PAGE__UNINSTALL,
    _invalidTypename: APPLICATION_PAGE__UNINSTALL_INVALID,
    _errorTypename: APPLICATION_PAGE__UNINSTALL_ERROR
});

export const applicationDetailUninstall = (_appId) => uninstall({
    _appId: _appId,

    _typename: APPLICATION_DETAIL_PAGE__UNINSTALL,
    _invalidTypename: APPLICATION_DETAIL_PAGE__UNINSTALL_INVALID,
    _errorTypename: APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR
});

export const mainUninstall = (_appId) => uninstall({
    _appId: _appId,

    _typename: MAIN_PAGE__UNINSTALL,
    _invalidTypename: MAIN_PAGE__UNINSTALL_INVALID,
    _errorTypename: MAIN_PAGE__UNINSTALL_ERROR
});