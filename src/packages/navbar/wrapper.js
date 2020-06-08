import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link, NavLink as RouterNavLink} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

export const NavBarWrapper = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <Navbar color={"dark"} dark expand={"sm"} fixed={"top"}>
            <Link to={"/"} className={"navbar-brand"}>Jellicle Space</Link>
            <NavbarToggler onClick={() => setOpen(!open)}/>
            <Collapse isOpen={open} navbar>
                <Nav className={"mr-auto"} navbar>
                    <NavItem>
                        <RouterNavLink to={"/application/"} className={"nav-link"}>어플리케이션</RouterNavLink>
                    </NavItem>
                    <NavItem>
                        <RouterNavLink to={"/user/profile/"} className={"nav-link"}>프로필 수정</RouterNavLink>
                    </NavItem>

                    <NavItem>
                        <RouterNavLink to={"/user/password/"} className={"nav-link"}>비밀번호 수정</RouterNavLink>
                    </NavItem>
                </Nav>
                <Nav navbar>
                    <NavItem>
                        <NavLink href={"/user/logout/"}>로그아웃</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

NavBarWrapper.propTypes = {}

