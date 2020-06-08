export const Codes = {
    // With server - Response
    SUCCESS: "success",
    INVALID: "invalid",
    ERROR: "error",

    VALID_AVAIL: "validAvail",
    VALID_VERIFIED: "validVerified",
    VALID_NOT_CHANGED: "validNotChanged",

    INVALID_USER: "invalidUser",
    INVALID_UNIQUE: "invalidUnique",
    INVALID_NOT_ALLOWED: "invalidNotAllowed",
    INVALID_NOT_EQUAL: "invalidNotEqual",
    INVALID_EQUAL: "invalidEqual",
    INVALID_BLANK: "invalidBlank",
    INVALID_FORMAT: "invalidFormat",

    // Client
    INVALID_VERIFIED: "invalidVerified",
    INVALID_EQUAL2: "invalidEqual2",

}

export const ParameterKeys = {
    USER_ID: "userId",
    SESSION_ID: "sessionId",
    TOKEN_ID: "tokenId",
    USERNAME: "username",
    EMAIL: "email"
}

export const getValidArr = () => {
    const _r = [];

    for (let [_k, _v] of Object.entries(Codes)) {
        if (_v.startsWith("valid")) {
            _r.push(_v);
        }
    }

    return _r;
}

export const getInvalidArr = () => {
    const _r = [];

    for (let [_k, _v] of Object.entries(Codes)) {
        if (_v.startsWith("invalid")) {
            _r.push(_v);
        }
    }

    return _r;
}
