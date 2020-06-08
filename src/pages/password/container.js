import React from "react";
import {connect} from "react-redux";
import {PasswordWrapper} from "./wrapper";
import {
    statusInit,
    passwordPageLoading,
    passwordInit,
    passwordChangingPassword,
    passwordChangingNewPasswordCheck,
    passwordChangingNewPassword,
    passwordValidatingFormBlank,
    passwordUpdate,
} from "../../actions";
import {
    INIT,
    PASSWORD_PAGE__LOADING_ERROR,
    PASSWORD_PAGE__UPDATE,
    PASSWORD_PAGE__UPDATE_ERROR,
} from "../../keys";
import {Codes} from "../../utils";

const mapStateToProps = (state) => {
    return {
        ...state.password,
        status: state.system.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: () => dispatch(passwordPageLoading()),
        onInit: () => dispatch(passwordInit()),
        onChangePassword: (e) => dispatch(passwordChangingPassword(e.currentTarget.value)),
        onChangeNewPassword: (e) => dispatch(passwordChangingNewPassword(e.currentTarget.value)),
        onChangeNewPasswordCheck: (e) => dispatch(passwordChangingNewPasswordCheck(e.currentTarget.value)),
        onUpdate: ({password, passwordCode, newPassword, newPasswordCode, newPasswordCheck, newPasswordCheckCode}) => {

            if (password === "" || newPassword === "" || newPasswordCheck === "") {
                return dispatch(passwordValidatingFormBlank());
            }

            if (passwordCode === null && newPasswordCode === Codes.VALID_AVAIL && newPasswordCheckCode === Codes.VALID_AVAIL) {
                return dispatch(passwordUpdate({
                    password: password,
                    newPassword: newPassword,
                    newPasswordCheck: newPasswordCheck
                }))
            }
        }
    }
};

class PasswordContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onLoad();
    }

    componentWillUnmount() {
        this.props.onInit();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loaded && prevProps.status === INIT) {
            switch (this.props.status) {
                case PASSWORD_PAGE__UPDATE:
                    alert("비밀번호를 변경하였습니다.");
                    document.querySelectorAll("input[type='password']").forEach(item => item.value = "");
                    this.props.onStatusInit();
                    break;

                case PASSWORD_PAGE__LOADING_ERROR:
                case PASSWORD_PAGE__UPDATE_ERROR:
                    alert("잠시후에 다시 시도하여 주세요.")
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <PasswordWrapper
                pageCode={this.props.pageCode}

                passwordHandler={this.props.onChangePassword}
                passwordCode={this.props.passwordCode}

                newPasswordHandler={this.props.onChangeNewPassword}
                newPasswordCode={this.props.newPasswordCode}

                newPasswordCheckHandler={this.props.onChangeNewPasswordCheck}
                newPasswordCheckCode={this.props.newPasswordCheckCode}

                onUpdate={() => this.props.onUpdate({
                    password: this.props.password,
                    passwordCode: this.props.passwordCode,
                    newPassword: this.props.newPassword,
                    newPasswordCode: this.props.newPasswordCode,
                    newPasswordCheck: this.props.newPasswordCheck,
                    newPasswordCheckCode: this.props.newPasswordCheckCode
                })}
            />
        )
    }
}

export const PasswordPage = connect(mapStateToProps, mapDispatchToProps)(PasswordContainer);