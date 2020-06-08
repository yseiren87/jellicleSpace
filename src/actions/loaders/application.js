import {
    APPLICATION_PAGE__LOADING,
    APPLICATION_PAGE__LOADING_MORE,
    APPLICATION_PAGE__LOADING_INVALID,
    APPLICATION_PAGE__LOADING_ERROR,
} from "../../keys";
import {getRequestAction} from "../../utils";

const loadingList = ({_typename, _page, _size}) => getRequestAction({
    _url: "/service/application/launcher/",
    _params: {page: _page, size: _size},
    _hasUserId: true,
    _hasUserToken: true,
    _typename: _typename,
    _invalidTypename: APPLICATION_PAGE__LOADING_INVALID,
    _errorTypename: APPLICATION_PAGE__LOADING_ERROR
})

export const applicationPageLoading = (_size) => loadingList({
    _typename: APPLICATION_PAGE__LOADING,
    _page: 1,
    _size: _size
})

export const applicationPageLoadingMore = ({_page, _size}) => loadingList({
    _typename: APPLICATION_PAGE__LOADING_MORE,
    _page: _page,
    _size: _size
})