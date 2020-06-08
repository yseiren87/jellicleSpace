import React from "react";
import {connect} from "react-redux"
import {
    INIT,
    LOGIN_PAGE__LOGIN,
    LOGIN_PAGE__LOGIN_ERROR,
} from "../../keys";
import {
    statusInit,
    loginPageLoading,
    loginPageInit,
    loginChangingUsername,
    loginChangingPassword,
    loginValidatingFormBlank,
    login
} from "../../actions";
import {LoginWrapper} from "./wrapper";


const mapStateToProps = (state) => {
    return {
        ...state.login,
        status: state.system.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: () => dispatch(loginPageLoading()),
        onInit: () => dispatch(loginPageInit()),
        onChangeUsername: (e) => dispatch(loginChangingUsername(e.currentTarget.value)),
        onChangePassword: (e) => dispatch(loginChangingPassword(e.currentTarget.value)),
        onLogin: ({username, usernameCode, password, passwordCode}) => {

            if (username === "" || password === "") {
                return dispatch(loginValidatingFormBlank());
            }

            if (usernameCode === null && passwordCode === null) {
                return dispatch(login({username, password}));
            }
        },
    }
};

class LoginPageContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            landingUrl: landingUrl,
        }
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
                case LOGIN_PAGE__LOGIN:
                    location.href = this.state.landingUrl;
                    break;

                case LOGIN_PAGE__LOGIN_ERROR:
                    alert("잠시후에 다시 시도해 주세요.")
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <LoginWrapper
                pageCode={this.props.pageCode}

                usernameValue={this.props.username}
                usernameHandler={this.props.onChangeUsername}
                usernameCode={this.props.usernameCode}

                passwordHandler={this.props.onChangePassword}
                passwordCode={this.props.passwordCode}

                onLogin={() => this.props.onLogin({
                    username: this.props.username,
                    usernameCode: this.props.usernameCode,
                    password: this.props.password,
                    passwordCode: this.props.passwordCode,
                })}
            />
        )
    }
}


export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);

