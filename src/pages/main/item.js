import React from "react";
import PropTypes from "prop-types";
import {
    Button
} from "reactstrap";
import sf from "sf";

export const MainItem = (props) => {

    const {
        appId,
        name,
        iconUrl,
        url,
        onRun,
        onUninstall
    } = props;

    return (
        <div title={sf("{0} ({1})", name, url)}
             className={"col-3 d-flex justify-content-center main-item"}>

            <Button color={"danger"} title={"삭제"}
                    data-appid={appId}
                    onClick={onUninstall}
                    className={"main-item__delete-button"}>
                &times;
            </Button>

            <div className={"main-item__frame"}
                 data-url={url}
                 onClick={onRun}>

                <img className={"main-item__icon img-fluid mx-auto d-block"}
                     src={iconUrl} alt={iconUrl}/>
                <p className={"main-item__name text-center"}>{name}</p>
            </div>

        </div>
    )
};

MainItem.propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,

    onRun: PropTypes.func.isRequired,
    onUninstall: PropTypes.func.isRequired,
};