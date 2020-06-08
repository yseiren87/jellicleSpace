import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Codes,
    getInvalidArr,
    getValidArr
} from "../../utils";
import {
    Footer,
    NavBar
} from "../../packages";
import {
    Container,
    FormGroup,
    Label,
    Row,
    Col,
    Input,
    FormFeedback,
    Button,
    Alert,
    Table
} from "reactstrap";
import sf from "sf";


export const ProfileWrapper = (props) => {
    const {
        pageCode,

        usernameHandler,
        usernameValue,
        usernameCode,

        emailHandler,
        emailValue,
        emailCode,

        applicationListValue,

        exitApprovalValue,
        exitApprovalHandler,

        onVerifyingUsername,
        onUpdate,
        onReset,
        onLoadUsingApplications,
        onExit,
    } = props;

    const _va = getValidArr(), _iva = getInvalidArr();
    const [exitOpen, setExitOpen] = useState(false);

    return (
        <>
            <NavBar/>

            <Container className={"mxw--700 mt-5 pt-5"}>

                <section>
                    <FormGroup row>
                        <Label for={"profilePageUsername"} sm={3}>사용자 이름</Label>
                        <Col sm={9}>
                            <Row>
                                <Col xs={8}>
                                    <Input name={"username"}
                                           placeholder={"사용자 이름"}
                                           id={"profilePageUsername"}
                                           autoComplete={"off"}
                                           valid={(usernameCode !== null) ? (_va.indexOf(usernameCode) !== -1) : undefined}
                                           invalid={(usernameCode !== null) ? (_iva.indexOf(usernameCode) !== -1) : undefined}
                                           value={usernameValue}
                                           onChange={usernameHandler}/>
                                    {
                                        usernameCode !== null ? (
                                            <FormFeedback
                                                valid={_va.indexOf(usernameCode) !== -1}>{usernameCode}</FormFeedback>
                                        ) : undefined
                                    }
                                </Col>
                                <Col xs={4}>
                                    <Button color={"danger"} block={true} onClick={onVerifyingUsername}>중복확인</Button>
                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={"profilePageEmail"} sm={3}>이메일</Label>
                        <Col sm={9}>
                            <Input name={"email"}
                                   placeholder={"이메일"}
                                   type={"email"}
                                   autoComplete={"off"}
                                   id={"profilePageEmail"}
                                   valid={(emailCode !== null) ? (_va.indexOf(emailCode) !== -1) : undefined}
                                   invalid={(emailCode !== null) ? (_iva.indexOf(emailCode) !== -1) : undefined}
                                   value={emailValue}
                                   onChange={emailHandler}/>
                            {
                                emailCode !== null ? (
                                    <FormFeedback
                                        valid={_va.indexOf(emailCode) !== -1}>{emailCode}</FormFeedback>
                                ) : undefined
                            }
                        </Col>
                    </FormGroup>
                </section>

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

                <hr/>

                <section className={"d-flex justify-content-between profile__button-section"}>

                    <div>
                        <Button color={"outline-danger button"} onClick={() => {
                            if (exitOpen === false) onLoadUsingApplications();
                            setExitOpen(!exitOpen);
                        }}>
                            <img className={"button__prefix" + sf(exitOpen ? " button__prefix--up" : "")}
                                 src={sf("{0}images/triangle-15.svg", assetUrl)} alt={"triangle"}/>
                            탈퇴
                        </Button>
                    </div>
                    <div>
                        <Button color={"primary"} className={"mr-2"} onClick={onUpdate}>저장</Button>
                        <Button color={"secondary"} onClick={onReset}>초기화</Button>
                    </div>
                </section>

                <section className={"profile__exit-section " + (exitOpen ? "fadein" : "fadeout")}>


                    {
                        applicationListValue === null ? undefined :
                            applicationListValue.length === 0 ?
                                <h5>사용중인 어플리케이션이 없습니다.</h5> :
                                <>
                                    <h5>사용중인 어플리케이션</h5>
                                </>
                    }


                    <Table size={"sm"} className={"mt-3"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>프로그램 이름</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>안녕하세요.</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p>탈퇴시, 현재 사용중인 어플리케이션의 정보를 복구할 수 없습니다.</p>

                    <div className={"d-flex justify-content-between"}>
                        <FormGroup check>
                            <Input type={"checkbox"} name={"agreeingExit"} id={"agreeingExit"}
                                   checked={exitApprovalValue}
                                   onChange={exitApprovalHandler}/>
                            <Label for={"agreeingExit"}>위 내용을 확인하였으며, 탈퇴에 동의합니다.</Label>
                        </FormGroup>
                        <Button color={"danger"} onClick={onExit}>탈퇴하기</Button>
                    </div>

                </section>
            </Container>
            <Footer/>
        </>
    )
};

ProfileWrapper.propTypes = {
    pageCode: PropTypes.object,

    usernameHandler: PropTypes.func.isRequired,
    usernameValue: PropTypes.string.isRequired,
    usernameCode: PropTypes.string,

    emailHandler: PropTypes.func.isRequired,
    emailValue: PropTypes.string.isRequired,
    emailCode: PropTypes.string,

    applicationListValue: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.number.isRequired,
            name: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
        }).isRequired
    ),

    exitApprovalHandler: PropTypes.func.isRequired,
    exitApprovalValue: PropTypes.bool.isRequired,

    onVerifyingUsername: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onLoadUsingApplications: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
}

