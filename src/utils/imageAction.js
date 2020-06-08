import {defaultAction} from "./defaultAction";

const result = {
    success: (
        {
            event, file, dispatch,
            successTypeName
        }
    ) => {
        return dispatch(defaultAction(successTypeName, {
            src: event.currentTarget.result,
            alt: file.name,
            file
        }));
    },
    invalid: (
        {
            error, dispatch,
            invalidTypeName
        }
    ) => {
        return dispatch(defaultAction(invalidTypeName, error));
    }
};

export const imageAction = (_typeName, _invalidTypeName, image) => {
    return dispatch => {
        if (image === undefined) {
            return result.invalid({
                error: "not found",
                dispatch,
                invalidTypeName: _invalidTypeName
            })
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = event => result.success({
            event,
            file: image,
            dispatch,
            successTypeName: _typeName
        });

        reader.onerror = error => result.invalid({
            error,
            dispatch,
            invalidTypeName: _invalidTypeName
        });
    }
};