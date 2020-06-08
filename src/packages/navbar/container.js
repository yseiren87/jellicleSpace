import React from "react";
import {connect} from "react-redux";

import {NavBarWrapper} from "./wrapper";


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

class NavBarContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavBarWrapper/>
        )
    }
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);