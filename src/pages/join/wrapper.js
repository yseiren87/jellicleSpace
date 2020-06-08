import React from "react";
import PropTypes from "prop-types";
import {
    FormGroup,
    FormFeedback,
    Container,
    Col,
    Button,
    Input,
    Alert
} from "reactstrap";
import {Link} from "react-router-dom";
import {
    Codes,
    getInvalidArr,
    getValidArr
} from "../../utils";
import sf from "sf";

export const JoinWrapper = (props) => {

    const {
        pageCode,

        usernameHandler,
        usernameValue,
        usernameCode,

        passwordHandler,
        passwordCode,

        passwordCheckHandler,
        passwordCheckCode,

        emailHandler,
        emailValue,
        emailCode,

        onVerifyingUsername,
        onJoin,
    } = props;

    const _va = getValidArr(), _iva = getInvalidArr();

    return (
        <Container className={"pt-5 mxw--400"}>
            <h4 className={"text-center"}>Jellicle Space</h4>

            <section className={"mt-4"}>
                <FormGroup row>
                    <Col xs={8}>
                        <Input name={"username"}
                               placeholder={"사용자 이름"}
                               autoComplete={"off"}
                               valid={(usernameCode !== null) ? (_va.indexOf(usernameCode) !== -1) : undefined}
                               invalid={(usernameCode !== null) ? (_iva.indexOf(usernameCode) !== -1) : undefined}
                               onChange={usernameHandler}
                               value={usernameValue}/>
                        {
                            usernameCode !== null ? (
                                <FormFeedback valid={_va.indexOf(usernameCode) !== -1}>{usernameCode}</FormFeedback>
                            ) : undefined
                        }
                    </Col>
                    <Col xs={4}>
                        <Button color={"danger"} block={true} onClick={onVerifyingUsername}>중복확인</Button>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Input name={"password"}
                           type={"password"}
                           placeholder={"비밀번호"}
                           valid={(passwordCode !== null) ? (_va.indexOf(passwordCode) !== -1) : undefined}
                           invalid={(passwordCode !== null) ? (_iva.indexOf(passwordCode) !== -1) : undefined}
                           onChange={passwordHandler}/>
                    {
                        passwordCode !== null ? (
                            <FormFeedback valid={_va.indexOf(passwordCode) !== -1}>{passwordCode}</FormFeedback>
                        ) : undefined
                    }
                </FormGroup>

                <FormGroup>
                    <Input name={"passwordCheck"}
                           type={"password"}
                           placeholder={"비밀번호 확인"}
                           valid={(passwordCheckCode !== null) ? (_va.indexOf(passwordCheckCode) !== -1) : undefined}
                           invalid={(passwordCheckCode !== null) ? (_iva.indexOf(passwordCheckCode) !== -1) : undefined}
                           onChange={passwordCheckHandler}/>
                    {
                        passwordCheckCode !== null ? (
                            <FormFeedback valid={_va.indexOf(passwordCheckCode) !== -1}>
                                {passwordCheckCode}
                            </FormFeedback>
                        ) : undefined
                    }
                </FormGroup>

                <FormGroup>
                    <Input name={"email"}
                           type={"email"}
                           autoComplete={"off"}
                           placeholder={"이메일"}
                           valid={(emailCode !== null) ? (_va.indexOf(emailCode) !== -1) : undefined}
                           invalid={(emailCode !== null) ? (_iva.indexOf(emailCode) !== -1) : undefined}
                           value={emailValue}
                           onChange={emailHandler}/>
                    {
                        emailCode !== null ? (
                            <FormFeedback valid={_va.indexOf(emailCode) !== -1}>
                                {emailCode}
                            </FormFeedback>
                        ) : undefined
                    }
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

            <section>
                <Button color={"primary"} block={true} onClick={onJoin}>가입하기</Button>
                <div className={"d-flex justify-content-center"}>
                    <Link to={sf("/login/{0}", location.search)} role={"button"}>로그인하러 가기</Link>
                </div>
            </section>

            <hr/>

            <footer className={"text-center"}>
                <small>By Yang Jin Je @ Jellicle</small>
            </footer>

        </Container>
    )
};

JoinWrapper.propTypes = {
    pageCode: PropTypes.object,

    usernameHandler: PropTypes.func.isRequired,
    usernameValue: PropTypes.string.isRequired,
    usernameCode: PropTypes.string,

    passwordHandler: PropTypes.func.isRequired,
    passwordCode: PropTypes.string,

    passwordCheckHandler: PropTypes.func.isRequired,
    passwordCheckCode: PropTypes.string,

    emailHandler: PropTypes.func.isRequired,
    emailValue: PropTypes.string.isRequired,
    emailCode: PropTypes.string,

    onVerifyingUsername: PropTypes.func.isRequired,
    onJoin: PropTypes.func.isRequired,
};
