import {defaultAction} from "./defaultAction";
import axios from "axios";
import {Codes, ParameterKeys} from "./constants";

const response = {
    then: (
        {
            _res, _dispatch, _passValue,
            _typename, _action,
            _invalidTypename, _invalidAction,
            _errorTypename, _errorAction,
        }
    ) => {
        let data = _res.data;

        if (_passValue !== undefined && _passValue !== null) {
            if (typeof _passValue === "object") {
                data = {
                    ...data,
                    ..._passValue
                }
            } else {
                data._value = _passValue;
            }
        }

        switch (data.status) {
            case Codes.SUCCESS:
                return _dispatch(defaultAction(_typename, data, _action))

            case Codes.INVALID:
                return _dispatch(defaultAction(_invalidTypename, data, _invalidAction));

            case Codes.ERROR:
                console.log(data);
                return _dispatch(defaultAction(_errorTypename, data, _errorAction));
        }

    },
    catch: (
        {
            _error, _dispatch, _passValue,
            _typeName, _action
        }
    ) => {
        console.log(_error);

        if (_typeName !== undefined && _typeName !== null) {
            return _dispatch(defaultAction(_typeName, _error, _action));
        }
    }
};


export const getRequestAction = (
    {
        _url, _params, _passValue,
        _hasUserToken, _hasUserId,
        _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
    }
) => {

    const _p = _params === undefined ? {} : _params;
    if (_hasUserToken === true) _p[ParameterKeys.TOKEN_ID] = userInfo[ParameterKeys.TOKEN_ID];
    if (_hasUserId === true) _p[ParameterKeys.USER_ID] = userInfo[ParameterKeys.USER_ID];

    return (dispatch) => axios.get(_url, {params: _p})
        .then((res) => response.then(
            {
                _res: res, _dispatch: dispatch, _passValue,
                _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
            }
        )).catch((error) => response.catch(
            {
                _error: error, _dispatch: dispatch, _passValue,
                _typeName: _errorTypename, _action: _errorAction
            }
        ));
};

export const postRequestAction = (
    {
        _url, _params, _passValue,
        _isMultipart, _hasUserToken, _hasUserId,
        _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
    }
) => {
    let _p = _params === undefined ? {} : _params,
        _h = {"X-CSRFToken": csrfToken};

    if (_hasUserToken === true) _p[ParameterKeys.TOKEN_ID] = userInfo[ParameterKeys.TOKEN_ID];
    if (_hasUserId === true) _p[ParameterKeys.USER_ID] = userInfo[ParameterKeys.USER_ID];

    let _d = _p;
    if (_isMultipart) {
        _h["content-type"] = "multipart/form-data";

        _d = new FormData();
        for (let [_k, _v] of Object.entries(_p)) {
            (_k === "image" && _v !== null) ?
                _d.append(_k, _v, _v.name) :
                _d.append(_k, _v)
        }
    }

    return (dispatch) => axios.post(_url, _d, {headers: _h})
        .then((res) => response.then(
            {
                _res: res, _dispatch: dispatch, _passValue,
                _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
            }
        )).catch((error) => response.catch(
            {
                _error: error, _dispatch: dispatch, _passValue,
                _typeName: _errorTypename, _action: _errorAction
            }
        ));
};

export const putRequestAction = (
    {
        _url, _params, _passValue,
        _isMultipart, _hasUserToken, _hasUserId,
        _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
    }
) => {
    let _p = _params === undefined ? {} : _params,
        _h = {"X-CSRFToken": csrfToken};

    if (_hasUserToken === true) _p[ParameterKeys.TOKEN_ID] = userInfo[ParameterKeys.TOKEN_ID];
    if (_hasUserId === true) _p[ParameterKeys.USER_ID] = userInfo[ParameterKeys.USER_ID];

    let _d = _p;
    if (_isMultipart) {
        _h["content-type"] = "multipart/form-data";

        _d = new FormData();
        for (let [_k, _v] of Object.entries(_p)) {
            (_k === "image" && _v !== null) ?
                _d.append(_k, _v, _v.name) :
                _d.append(_k, _v)
        }
    }

    return (dispatch) => axios.put(_url, _d, {headers: _h})
        .then((res) => response.then(
            {
                _res: res, _dispatch: dispatch, _passValue,
                _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
            }
        )).catch((error) => response.catch(
            {
                _error: error, _dispatch: dispatch, _passValue,
                _typeName: _errorTypename, _action: _errorAction
            }
        ));
};

export const deleteRequestAction = (
    {
        _url, _params, _passValue,
        _hasUserToken, _hasUserId,
        _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
    }
) => {
    let _h = {"X-CSRFToken": csrfToken};

    const _p = _params === undefined ? {} : _params;
    if (_hasUserToken === true) _p[ParameterKeys.TOKEN_ID] = userInfo[ParameterKeys.TOKEN_ID];
    if (_hasUserId === true) _p[ParameterKeys.USER_ID] = userInfo[ParameterKeys.USER_ID];

    return (dispatch) => axios.delete(_url, {params: _p, headers: _h})
        .then((res) => response.then(
            {
                _res: res, _dispatch: dispatch, _passValue,
                _typename, _action, _invalidTypename, _invalidAction, _errorTypename, _errorAction
            }
        )).catch((error) => response.catch(
            {
                _error: error, _dispatch: dispatch, _passValue,
                _typeName: _errorTypename, _action: _errorAction
            }
        ));
};
