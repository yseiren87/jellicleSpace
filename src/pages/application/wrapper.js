import React from "react";
import PropTypes from "prop-types";
import {
    Footer,
    NavBar
} from "../../packages";
import {
    Container,
    Row,
    Col,
    Input,
    Alert,
    Button
} from "reactstrap";
import {ApplicationItem} from "./item";
import {Codes} from "../../utils";

export const ApplicationWrapper = (props) => {
    const {
        pageCode,

        queryHandler,
        queryValue,

        applicationList,
        more,

        onLoadMore,
        onInstall,
        onUninstall,
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

                <section className={"display-none"}>
                    {
                        (applicationList === null || applicationList.length === 0) ? undefined : (
                            <Input value={queryValue} onChange={queryHandler} placeholder={"어플리케이션 이름"}/>
                        )
                    }
                </section>

                <section className={"mt-3"}>
                    {
                        applicationList === null ? undefined :
                            applicationList.length === 0 ?
                                (<h5 className={"text-center"}>어플리케이션이 없습니다.</h5>) :
                                (
                                    <Row className={"row-cols-1 row-cols-2"}>
                                        {
                                            applicationList.map((item, index) =>
                                                <Col key={index} className={"mb-4"}>
                                                    <ApplicationItem
                                                        appId={item.appId}
                                                        name={item.name}
                                                        description={item.description}
                                                        iconUrl={item.iconUrl}
                                                        previewImageUrl={item.previewImageUrl}
                                                        installed={item.installed}

                                                        onInstall={onInstall}
                                                        onUninstall={onUninstall}
                                                    />
                                                </Col>
                                            )
                                        }
                                    </Row>
                                )
                    }
                </section>

                <section>
                    {
                        more === false ? undefined : (
                            <Button color={"primary"} block={true} onClick={onLoadMore}>
                                불러오기
                            </Button>
                        )
                    }
                </section>
            </Container>
            <Footer/>
        </>
    )
};

ApplicationWrapper.propTypes = {
    pageCode: PropTypes.object,

    queryHandler: PropTypes.func.isRequired,
    queryValue: PropTypes.string.isRequired,

    applicationList: PropTypes.arrayOf(
        PropTypes.shape({
            appId: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            iconUrl: PropTypes.string.isRequired,
            previewImageUrl: PropTypes.string,
            installed: PropTypes.bool.isRequired
        }).isRequired
    ),
    more: PropTypes.bool.isRequired,

    onLoadMore: PropTypes.func.isRequired,
    onInstall: PropTypes.func.isRequired,
    onUninstall: PropTypes.func.isRequired,
}

