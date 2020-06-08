import React from "react";
import {connect} from "react-redux";
import {FooterWrapper} from "./wrapper";


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

class FooterContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FooterWrapper/>
        )
    }
}

export const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterContainer);