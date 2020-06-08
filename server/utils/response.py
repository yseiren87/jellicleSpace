from .parameter_keys import ParameterKeys


def get_serializer_error_code(serializer):
    _err = serializer.errors

    _t = {}
    for _k in _err.keys():
        _c = _err[_k][0].code

        if _c == "invalid":
            _c = ParameterKeys.INVALID_FORMAT

        _t[_k] = _c

    return _t
