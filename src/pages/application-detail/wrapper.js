import React from "react";
import PropTypes from "prop-types";
import {
    Footer,
    NavBar
} from "../../packages";
import {
    Container,
    Alert,
    ButtonGroup,
    Button
} from "reactstrap";
import {Codes} from "../../utils";

export const ApplicationDetailWrapper = (props) => {
    const {
        pageCode,

        appId,
        name,
        description,
        url,
        iconUrl,
        previewImageUrl,
        publishDate,
        installed,

        onRun,
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

                <section className={"d-flex justify-content-start"}>
                    <img src={iconUrl} alt={iconUrl} width={"auto"} height={"158px"}/>
                    <div className={"w-100"}>
                        <div className={"d-flex justify-content-between"}>
                            <h5>{name}</h5>

                            <ButtonGroup>
                                {
                                    (installed === false) ?
                                        (<Button color={"primary"} onClick={onInstall}>설치</Button>) :
                                        (<>
                                            <Button color={"info"}
                                                    onClick={onRun}>
                                                실행
                                            </Button>
                                            <Button color={"danger"}
                                                    onClick={onUninstall}>
                                                삭제
                                            </Button>
                                        </>)
                                }
                            </ButtonGroup>

                        </div>
                        <p>{description}</p>
                        <p>{url}</p>
                        <p>{publishDate}</p>
                    </div>
                </section>

                <hr/>

                <section>
                    {
                        previewImageUrl === null ?
                            (<p className={"text-center"}>미리보기 이미지가 없습니다.</p>) :
                            (<img src={previewImageUrl} alt={previewImageUrl}/>)
                    }
                </section>

            </Container>

            <Footer/>
        </>
    )
};

ApplicationDetailWrapper.propTypes = {
    pageCode: PropTypes.object,

    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    previewImageUrl: PropTypes.string,
    publishDate: PropTypes.string.isRequired,
    installed: PropTypes.bool.isRequired,

    onRun: PropTypes.func.isRequired,
    onInstall: PropTypes.func.isRequired,
    onUninstall: PropTypes.func.isRequired,
}

