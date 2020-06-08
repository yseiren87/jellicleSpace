import React from "react";
import PropTypes from "prop-types";
import {
    Footer,
    NavBar
} from "../../packages";
import {
    Alert,
    Container,
    Row
} from "reactstrap";
import {Codes} from "../../utils";
import {Link} from "react-router-dom";
import {MainItem} from "./item";

export const MainWrapper = (props) => {

    const {
        pageCode,
        applicationList,
        onRun,
        onUninstall
    } = props;

    return (
        <>
            <NavBar/>

            <Container className={"mxw--700 mt-5 pt-5"}>

                <section>
                    {
                        (pageCode !== null && pageCode.status === Codes.INVALID) ?
                            (
                                <Alert color={"danger"} className={"mt-3 mb-3"}>
                                    {JSON.stringify(pageCode)}
                                </Alert>
                            ) : undefined
                    }
                </section>

                <section>
                    {
                        applicationList == null ? undefined :
                            applicationList.length === 0 ?
                                (
                                    <>
                                        <p className={"text-center"}>프로그램이 없습니다.</p>
                                        <Link to={"/application/"}>
                                            <p className={"text-center"}>설치 바로가기</p>
                                        </Link>
                                    </>
                                ) :
                                (
                                    <Row>
                                        {
                                            applicationList.map((item, index) =>
                                                <MainItem key={index}
                                                          appId={item.appId}
                                                          name={item.name}
                                                          iconUrl={item.iconUrl}
                                                          url={item.url}
                                                          onRun={onRun}
                                                          onUninstall={onUninstall}
                                                />
                                            )
                                        }
                                    </Row>
                                )
                    }
                </section>

            </Container>

            <Footer/>
        </>
    )
};

MainWrapper.propTypes = {
    pageCode: PropTypes.object,
    applicationList: PropTypes.arrayOf(
        PropTypes.shape({
            appId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            iconUrl: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired
    ),
    onRun: PropTypes.func.isRequired,
    onUninstall: PropTypes.func.isRequired,
};