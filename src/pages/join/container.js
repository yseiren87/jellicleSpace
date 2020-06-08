import React from "react";
import {connect} from "react-redux"
import {
    INIT,
    JOIN_PAGE__VERIFYING_USERNAME_ERROR,
    JOIN_PAGE__JOIN,
    JOIN_PAGE__JOIN_ERROR,
} from "../../keys";
import {
    statusInit,
    joinPageLoading,
    joinPageInit,
    joinChangingUsername,
    joinChangingPasswordCheck,
    joinChangingPassword,
    joinChangingEmail,
    joinValidatingFormBlank,
    joinValidatingUsernameIsNotVerified,
    joinValidatingUsernameIsBlank,
    joinPageVerifyingUsername,
    join
} from "../../actions";
import {JoinWrapper} from "./wrapper";
import {Codes} from "../../utils";


const mapStateToProps = (state) => {
    return {
        ...state.join,
        status: state.system.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),

        onLoad: () => dispatch(joinPageLoading()),
        onInit: () => dispatch(joinPageInit()),

        onChangeUsername: (e) => dispatch(joinChangingUsername(e.currentTarget.value)),
        onChangePassword: (e) => dispatch(joinChangingPassword(e.currentTarget.value)),
        onChangePasswordCheck: (e) => dispatch(joinChangingPasswordCheck(e.currentTarget.value)),
        onChangeEmail: (e) => dispatch(joinChangingEmail(e.currentTarget.value)),

        onVerifyingUsername: ({username}) => {
            if (username === "") {
                return dispatch(joinValidatingUsernameIsBlank())
            }

            return dispatch(joinPageVerifyingUsername(username))
        },

        onJoin: ({username, usernameCode, password, passwordCode, passwordCheck, passwordCheckCode, email, emailCode}) => {
            if (username === "" || password === "" || passwordCheck === "" || email === "") {
                return dispatch(joinValidatingFormBlank());
            }

            if (usernameCode !== Codes.VALID_VERIFIED) {
                return dispatch(joinValidatingUsernameIsNotVerified());
            }

            if (passwordCode === Codes.VALID_AVAIL && passwordCheckCode === Codes.VALID_AVAIL && emailCode === Codes.VALID_AVAIL) {
                return dispatch(join({username, password, passwordCheck, email}));
            }
        }
    }
};

class JoinPageContainer extends React.Component {

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
                case JOIN_PAGE__JOIN:
                    location.href = this.state.landingUrl;
                    break;

                case JOIN_PAGE__VERIFYING_USERNAME_ERROR:
                case JOIN_PAGE__JOIN_ERROR:
                    alert("잠시후에 다시 시도해 주세요.")
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <JoinWrapper
                pageCode={this.props.pageCode}

                usernameHandler={this.props.onChangeUsername}
                usernameValue={this.props.username}
                usernameCode={this.props.usernameCode}

                passwordHandler={this.props.onChangePassword}
                passwordCode={this.props.passwordCode}

                passwordCheckHandler={this.props.onChangePasswordCheck}
                passwordCheckCode={this.props.passwordCheckCode}

                emailHandler={this.props.onChangeEmail}
                emailValue={this.props.email}
                emailCode={this.props.emailCode}

                onVerifyingUsername={() => this.props.onVerifyingUsername({
                    username: this.props.username
                })}
                onJoin={() => this.props.onJoin({
                    username: this.props.username,
                    usernameCode: this.props.usernameCode,
                    password: this.props.password,
                    passwordCode: this.props.passwordCode,
                    passwordCheck: this.props.passwordCheck,
                    passwordCheckCode: this.props.passwordCheckCode,
                    email: this.props.email,
                    emailCode: this.props.emailCode
                })}
            />
        )
    }
}


export const JoinPage = connect(mapStateToProps, mapDispatchToProps)(JoinPageContainer);

