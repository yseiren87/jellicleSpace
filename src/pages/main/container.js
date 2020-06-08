import React from "react";
import {connect} from "react-redux";
import {
    INIT,
    MAIN_PAGE__LOADING_ERROR,
    MAIN_PAGE__UNINSTALL_ERROR,
    MAIN_PAGE__RUN,
} from "../../keys";
import {
    statusInit,
    mainPageLoading,
    mainPageInit,
    mainUninstall,
    mainRun,
} from "../../actions";
import {MainWrapper} from "./wrapper";

const mapStateToProps = (state) => {
    return {
        ...state.main,
        status: state.system.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusInit: () => dispatch(statusInit()),
        onLoad: () => dispatch(mainPageLoading()),
        onInit: () => dispatch(mainPageInit()),
        onRun: (e) => dispatch(mainRun(e.currentTarget.dataset.url)),
        onUninstall: (e) => {
            const _s = confirm("삭제 하시겠습니까?");
            if(_s) return dispatch(mainUninstall(e.currentTarget.dataset.appid));
        }
    }
};

class MainPageContainer extends React.Component {
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
                case MAIN_PAGE__LOADING_ERROR:
                case MAIN_PAGE__UNINSTALL_ERROR:
                    alert("잠시후에 다시 시도해 주세요.")
                    this.props.onStatusInit();
                    break;

                case MAIN_PAGE__RUN:
                    location.href = this.props.appUrl;
                    this.props.onStatusInit();
                    break;

            }
        }
    }

    render() {

        return (
            <MainWrapper
                pageCode={this.props.pageCode}
                applicationList={this.props.applicationList}
                onRun={this.props.onRun}
                onUninstall={this.props.onUninstall}
            />
        )
    }
}

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);