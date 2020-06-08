import React from "react";
import {connect} from "react-redux";
import {TemplateWrapper} from "./wrapper";


const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

class TemplateContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <TemplateWrapper/>
        )
    }
}

export const Template = connect(mapStateToProps, mapDispatchToProps)(TemplateContainer);