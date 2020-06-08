import React from "react";
import PropTypes from "prop-types";
import {
    FormGroup,
    FormFeedback,
    Container,
    Button,
    Input,
    Alert
} from "reactstrap";
import {Link} from "react-router-dom";
import {Codes, getInvalidArr} from "../../utils";
import sf from "sf";

export const LoginWrapper = (props) => {

    const {
        pageCode,

        usernameHandler,
        usernameValue,
        usernameCode,

        passwordHandler,
        passwordCode,

        onLogin,
    } = props;

    const _iva = getInvalidArr();

    return (
        <Container className={"pt-5 mxw--400"}>
            <h4 className={"text-center"}>Jellicle Space</h4>

            <section className={"mt-4"}>
                <FormGroup>
                    <Input name={"userName"}
                           placeholder={"사용자 이름"}
                           autoComplete={"off"}
                           invalid={(usernameCode !== null) ? (_iva.indexOf(usernameCode) !== -1) : undefined}
                           onChange={usernameHandler}
                           value={usernameValue}/>
                    {
                        usernameCode !== null ? (<FormFeedback>{usernameCode}</FormFeedback>) : undefined
                    }

                </FormGroup>

                <FormGroup>
                    <Input type={"password"}
                           name={"password"}
                           placeholder={"비밀번호"}
                           invalid={(passwordCode !== null) ? (_iva.indexOf(passwordCode) !== -1) : undefined}
                           onChange={passwordHandler}/>
                    {
                        passwordCode !== null ? (<FormFeedback>{passwordCode}</FormFeedback>) : undefined
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
                <Button color={"primary"} block={true} onClick={onLogin}>로그인하기</Button>
                <div className={"d-flex justify-content-center"}>
                    <Link to={sf("/join/{0}", location.search)} role={"button"}>가입하러 가기</Link>
                </div>
            </section>

            <hr/>

            <footer className={"text-center"}>
                <small>By Yang Jin Je @ Jellicle</small>
            </footer>
        </Container>
    )
};

LoginWrapper.propTypes = {
    pageCode: PropTypes.object,

    usernameHandler: PropTypes.func.isRequired,
    usernameValue: PropTypes.string.isRequired,
    usernameCode: PropTypes.string,

    passwordHandler: PropTypes.func.isRequired,
    passwordCode: PropTypes.string,

    onLogin: PropTypes.func.isRequired,
};

