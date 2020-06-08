import React from "react";
import {connect} from "react-redux";
import {ApplicationDetailWrapper} from "./wrapper";
import {
    statusInit,
    applicationDetailPageLoading,
    applicationDetailPageInit,
    applicationDetailInstall,
    applicationDetailUninstall,
    applicationDetailRun,
} from "../../actions";
import {
    INIT,
    APPLICATION_DETAIL_PAGE__LOADING_ERROR,
    APPLICATION_DETAIL_PAGE__INSTALL,
    APPLICATION_DETAIL_PAGE__INSTALL_ERROR,
    APPLICATION_DETAIL_PAGE__UNINSTALL,
    APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR,
    APPLICATION_DETAIL_PAGE__RUN
} from "../../keys";

const mapStateToProps = (state) => {
    return {
        ...state.applicationDetail,
        status: state.system.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: (appId) => dispatch(applicationDetailPageLoading(appId)),
        onInit: () => dispatch(applicationDetailPageInit()),
        onInstall: (appId) => dispatch(applicationDetailInstall(appId)),
        onUninstall: (appId) => {
             const _s = confirm("삭제 하시겠습니까?");
            if(_s) return dispatch(applicationDetailUninstall(appId))
        },
        onRun: () => dispatch(applicationDetailRun()),
    }
};

class ApplicationDetailPageContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onLoad(this.props.match.params.appId);
    }

    componentWillUnmount() {
        this.props.onInit();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loaded && prevProps.status === INIT) {
            switch (this.props.status) {
                case APPLICATION_DETAIL_PAGE__LOADING_ERROR:
                case APPLICATION_DETAIL_PAGE__INSTALL_ERROR:
                case APPLICATION_DETAIL_PAGE__UNINSTALL_ERROR:
                    alert("잠시후에 다시 시도하여 주세요.")
                    this.props.onStatusInit();
                    break;

                case APPLICATION_DETAIL_PAGE__INSTALL:
                    alert("앱을 설치하였습니다.");
                    this.props.onStatusInit();
                    break;

                case APPLICATION_DETAIL_PAGE__UNINSTALL:
                    alert("앱을 삭제하였습니다.");
                    this.props.onStatusInit();
                    break;

                case APPLICATION_DETAIL_PAGE__RUN:
                    location.href = this.props.url;
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <ApplicationDetailWrapper
                pageCode={this.props.pageCode}

                appId={this.props.appId}
                name={this.props.name}
                description={this.props.description}
                url={this.props.url}
                iconUrl={this.props.iconUrl}
                previewImageUrl={this.props.previewImageUrl}
                publishDate={this.props.publishDate}
                installed={this.props.installed}

                onRun={this.props.onRun}
                onInstall={() => this.props.onInstall(this.props.appId)}
                onUninstall={() => this.props.onUninstall(this.props.appId)}
            />
        )
    }
}

export const ApplicationDetailPage = connect(mapStateToProps, mapDispatchToProps)(ApplicationDetailPageContainer);