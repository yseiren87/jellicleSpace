export const Comments = {
    login: {
        invalidUser: "사용자 이름과 비밀번호를 찾을 수 없습니다."
    },

    username: {
        blank: "사용자 이름을 채워주세요.",
        max_length: "사용자 이름은 50자를 넘을 수 없습니다.",
        required: "사용자 이름은 필수입니다.",
        unique: "동일한 사용자 이름이 존재합니다.",
        notAllowed: "특정단어는 허용되지 않습니다.",
        notChecked: "사용자 이름을 확인하여 주세요."
    },

    password: {
        blank: "비밀번호를 채워주세요.",
        max_length: "비밀번호는 50자를 넘을 수 없습니다.",
        required: "비밀번호는 필수입니다.",
        idEqual: "사용자 이름과 동일한 비밀번호는 사용할 수 없습니다.",
        notEqual: "비밀번호가 올바르지 않습니다.",
    },

    passwordCheck: {
        blank: "비밀번호 확인을 채워주세요.",
        max_length: "비밀번호 확인은 50자를 넘을 수 없습니다.",
        required: "비밀번호 확인은 필수입니다.",
        notEqual: "비밀번호와 동일하지 않습니다.",
    },

    email: {
        blank: "이메일을 채워주세요.",
        required: "이메일은 필수입니다.",
        invalid: "이메일 형식이 아닙니다.",
    },

    newPassword: {
        blank: "새 비밀번호는 빈칸이 허용되지 않습니다.",
        max_length: "새 비밀번호는 50자를 넘을 수 없습니다.",
        required: "새 비밀번호는 필수입니다.",
        id_equal: "사용자 이름과 동일한 비밀번호는 사용할 수 없습니다.",
        previous: "이전 비밀번호는 사용할 수 없습니다."
    },

    newPasswordVerify: {
        blank: "새 비밀번호 확인은 빈칸이 허용되지 않습니다.",
        max_length: "새 비밀번호 확인은 50자를 넘을 수 없습니다.",
        required: "새 비밀번호 확인은 필수입니다.",
        not_equal: "새 비밀번호와 같지 않습니다."
    },
};