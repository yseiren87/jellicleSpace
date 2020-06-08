import React from "react";
import {connect} from "react-redux";
import {ProfileWrapper} from "./wrapper";
import {
    statusInit,
    profilePageLoading,
    profilePageLoadingUsingApplications,
    profileInit,
    profileChangingUsername,
    profileChangingEmail,
    profileChangingExitApproval,
    profileValidatingUsernameIsNotVerified,
    profileValidatingUsernameIsNotChanged,
    profileValidatingUsernameIsBlank,
    profileValidatingNothingChanged,
    profileValidatingFormBlank,
    profileValidatingExitApprovalIsNotChecked,
    profileReset,
    profilePageVerifyingUsername,
    profileUpdate,
    profileExit,
} from "../../actions";
import {
    INIT,
    PROFILE_PAGE__LOADING_ERROR,
    PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR,
    PROFILE_PAGE__VALIDATING__NOTHING_CHANGED,
    PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED,
    PROFILE_PAGE__RESET,
    PROFILE_PAGE__VERIFYING_USERNAME_ERROR,
    PROFILE_PAGE__UPDATE,
    PROFILE_PAGE__UPDATE_ERROR,
    PROFILE_PAGE__EXIT,
    PROFILE_PAGE__EXIT_ERROR,
} from "../../keys";
import {Codes} from "../../utils";

const mapStateToProps = (state) => {
    return {
        ...state.profile,
        status: state.system.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: () => dispatch(profilePageLoading()),
        onLoadUsingApplications: () => dispatch(profilePageLoadingUsingApplications()),
        onInit: () => dispatch(profileInit()),
        onChangeUsername: (e) => dispatch(profileChangingUsername(e.currentTarget.value)),
        onChangeEmail: (e) => dispatch(profileChangingEmail(e.currentTarget.value)),
        onChangeExitApproval: () => dispatch(profileChangingExitApproval()),
        onReset: () => dispatch(profileReset()),
        onVerifyingUsername: ({username, usernamePrev}) => {
            if (username === "") {
                return dispatch(profileValidatingUsernameIsBlank());
            }

            if (username === usernamePrev) {
                return dispatch(profileValidatingUsernameIsNotChanged());
            }

            return dispatch(profilePageVerifyingUsername(username));
        },
        onUpdate: ({username, usernameCode, usernamePrev, email, emailPrev}) => {
            if (username === "" || email === "") {
                return dispatch(profileValidatingFormBlank());
            }

            if (username === usernamePrev && email === emailPrev) {
                return dispatch(profileValidatingNothingChanged());
            }

            if (username !== usernamePrev) {
                if (usernameCode !== Codes.VALID_VERIFIED) return dispatch(profileValidatingUsernameIsNotVerified());
            }

            return dispatch(profileUpdate({username, email}));

        },
        onExit: ({exitApproval}) => {
            if (exitApproval === false) return dispatch(profileValidatingExitApprovalIsNotChecked());

            return dispatch(profileExit());
        }
    }
};

class ProfileContainer extends React.Component {

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
                case PROFILE_PAGE__UPDATE:
                    alert("프로필을 변경하였습니다.");
                    this.props.onStatusInit();
                    break;

                case PROFILE_PAGE__LOADING_ERROR:
                case PROFILE_PAGE__LOADING_USING_APPLICATIONS_ERROR:
                case PROFILE_PAGE__VERIFYING_USERNAME_ERROR:
                case PROFILE_PAGE__UPDATE_ERROR:
                case PROFILE_PAGE__EXIT_ERROR:
                    alert("잠시후에 다시 시도하여 주세요.")
                    this.props.onStatusInit();
                    break;

                case PROFILE_PAGE__RESET:
                    alert("프로필 정보를 초기화하였습니다.");
                    this.props.onStatusInit();
                    break;

                case PROFILE_PAGE__VALIDATING__NOTHING_CHANGED:
                    alert("수정할 내용이 없습니다.");
                    this.props.onStatusInit();
                    break;

                case PROFILE_PAGE__VALIDATING__EXIT_APPROVAL_IS_NOT_CHECKED:
                    alert("체크박스를 확인하여 주세요.");
                    this.props.onStatusInit();
                    break;

                case PROFILE_PAGE__EXIT:
                    alert("탈퇴하였습니다.");
                    location.href = "/login/";
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <ProfileWrapper
                pageCode={this.props.pageCode}

                usernameHandler={this.props.onChangeUsername}
                usernameValue={this.props.username}
                usernameCode={this.props.usernameCode}

                emailHandler={this.props.onChangeEmail}
                emailValue={this.props.email}
                emailCode={this.props.emailCode}

                applicationListValue={this.props.applicationList}

                exitApprovalHandler={this.props.onChangeExitApproval}
                exitApprovalValue={this.props.exitApproval}

                onVerifyingUsername={() => this.props.onVerifyingUsername({
                    username: this.props.username,
                    usernamePrev: this.props.usernamePrev
                })}
                onUpdate={() => this.props.onUpdate({
                    username: this.props.username,
                    usernameCode: this.props.usernameCode,
                    usernamePrev: this.props.usernamePrev,
                    email: this.props.email,
                    emailPrev: this.props.emailPrev
                })}
                onReset={this.props.onReset}
                onLoadUsingApplications={this.props.onLoadUsingApplications}
                onExit={() => this.props.onExit({
                    exitApproval: this.props.exitApproval
                })}
            />
        )
    }
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);