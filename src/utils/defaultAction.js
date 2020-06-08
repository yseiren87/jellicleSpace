export const defaultAction = (_typename, _value, _action = undefined) => {
    if (_action !== undefined)
        (typeof _action === "function") ?
            _action(_value) :
            console.error(defaultAction, "preAction must be function type");

    if(Array.isArray(_value)){
        return {
            type: _typename,
            value: _value,
        }
    }

    else if (typeof _value === "object") {
        let _r = {};

        for (let [_k, _v] of Object.entries(_value)) {
            _r[_k] = (_v === undefined) ? null : _v;
        }

        return {
            type: _typename,
            value: _r
        }
    }

    return {
        type: _typename,
        value: _value
    }
};