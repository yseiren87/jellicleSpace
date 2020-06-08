import React from "react";
import {connect} from "react-redux";
import {ApplicationWrapper} from "./wrapper";
import {
    statusInit,
    applicationPageLoading,
    applicationPageLoadingMore,
    applicationPageInit,
    applicationChangingQuery,
    applicationInstall,
    applicationUninstall,
} from "../../actions";
import {
    INIT,
    APPLICATION_PAGE__LOADING_ERROR,
    APPLICATION_PAGE__INSTALL,
    APPLICATION_PAGE__INSTALL_ERROR,
    APPLICATION_PAGE__UNINSTALL,
    APPLICATION_PAGE__UNINSTALL_ERROR
} from "../../keys"

const mapStateToProps = (state) => {
    return {
        ...state.application,
        status: state.system.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: (_size) => dispatch(applicationPageLoading(_size)),
        onLoadMore: ({_page, _size}) => dispatch(applicationPageLoadingMore({_page, _size})),
        onInit: () => dispatch(applicationPageInit()),
        onChangeQuery: (e) => dispatch(applicationChangingQuery(e.currentTarget.value)),
        onInstall: (e) => dispatch(applicationInstall(e.currentTarget.dataset.appid)),
        onUninstall: (e) => {
            const _s = confirm("삭제 하시겠습니까?");
            if(_s) return dispatch(applicationUninstall(e.currentTarget.dataset.appid))
        },
    }
};

class ApplicationPageContainer extends React.Component {

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
                case APPLICATION_PAGE__LOADING_ERROR:
                case APPLICATION_PAGE__INSTALL_ERROR:
                case APPLICATION_PAGE__UNINSTALL_ERROR:
                    alert("잠시후에 다시 시도하여 주세요.")
                    this.props.onStatusInit();
                    break;

                case APPLICATION_PAGE__INSTALL:
                    alert("앱을 설치하였습니다.");
                    this.props.onStatusInit();
                    break;

                case APPLICATION_PAGE__UNINSTALL:
                    alert("앱을 삭제하였습니다.");
                    this.props.onStatusInit();
                    break;
            }
        }
    }

    render() {
        return (
            <ApplicationWrapper
                pageCode={this.props.pageCode}

                queryHandler={this.props.onChangeQuery}
                queryValue={this.props.query}

                applicationList={this.props.applicationList}
                more={this.props.more}

                onLoadMore={() => this.props.onLoadMore({
                    _page: this.props.page + 1
                })}
                onInstall={this.props.onInstall}
                onUninstall={this.props.onUninstall}
            />
        )
    }
}

export const ApplicationPage = connect(mapStateToProps, mapDispatchToProps)(ApplicationPageContainer);