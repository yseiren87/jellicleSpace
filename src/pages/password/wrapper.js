import React from "react";
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
    Col,
    Input,
    FormFeedback,
    Button,
    Alert
} from "reactstrap"

export const PasswordWrapper = (props) => {
    const {
        pageCode,

        passwordHandler,
        passwordCode,

        newPasswordHandler,
        newPasswordCode,

        newPasswordCheckHandler,
        newPasswordCheckCode,

        onUpdate,
    } = props;

    const _va = getValidArr(), _iva = getInvalidArr();

    return (
        <>
            <NavBar/>

            <Container className={"mxw--700 mt-5 pt-5"}>

                <section>
                    <FormGroup row>
                        <Label for={"passwordPassword"} sm={4}>현재 비밀번호</Label>
                        <Col sm={8}>
                            <Input name={"password"}
                                   placeholder={"현재 비밀번호"}
                                   type={"password"}
                                   autoComplete={"off"}
                                   id={"passwordPassword"}
                                   invalid={(passwordCode !== null) ? (_iva.indexOf(passwordCode) !== -1) : undefined}
                                   onChange={passwordHandler}/>
                            {
                                passwordCode !== null ? (
                                    <FormFeedback>{passwordCode}</FormFeedback>
                                ) : undefined
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={"passwordNewPassword"} sm={4}>새 비밀번호</Label>
                        <Col sm={8}>
                            <Input name={"newPassword"}
                                   placeholder={"새 비밀번호"}
                                   type={"password"}
                                   autoComplete={"off"}
                                   id={"passwordNewPassword"}
                                   valid={(newPasswordCode !== null) ? (_va.indexOf(newPasswordCode) !== -1) : undefined}
                                   invalid={(newPasswordCode !== null) ? (_iva.indexOf(newPasswordCode) !== -1) : undefined}
                                   onChange={newPasswordHandler}/>
                            {
                                newPasswordCode !== null ? (
                                    <FormFeedback
                                        valid={_va.indexOf(newPasswordCode) !== -1}>{newPasswordCode}</FormFeedback>
                                ) : undefined
                            }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for={"passwordNewPasswordCheck"} sm={4}>새 비밀번호 확인</Label>
                        <Col sm={8}>
                            <Input name={"newPasswordCheck"}
                                   placeholder={"새 비밀번호 확인"}
                                   type={"password"}
                                   autoComplete={"off"}
                                   id={"passwordNewPasswordCheck"}
                                   valid={(newPasswordCheckCode !== null) ? (_va.indexOf(newPasswordCheckCode) !== -1) : undefined}
                                   invalid={(newPasswordCheckCode !== null) ? (_iva.indexOf(newPasswordCheckCode) !== -1) : undefined}
                                   onChange={newPasswordCheckHandler}/>
                            {
                                newPasswordCheckCode !== null ? (
                                    <FormFeedback
                                        valid={_va.indexOf(newPasswordCheckCode) !== -1}>{newPasswordCheckCode}</FormFeedback>
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

                <section className={"d-flex justify-content-end"}>
                    <Button color={"primary"} className={"mr-2"} onClick={onUpdate}>저장</Button>
                </section>

            </Container>

            <Footer/>
        </>
    )
};

PasswordWrapper.propTypes = {
    pageCode: PropTypes.object,

    passwordHandler: PropTypes.func.isRequired,
    passwordCode: PropTypes.string,

    newPasswordHandler: PropTypes.func.isRequired,
    newPasswordCode: PropTypes.string,

    newPasswordCheckHandler: PropTypes.func.isRequired,
    newPasswordCheckCode: PropTypes.string,

    onUpdate: PropTypes.func.isRequired,
}

