import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardImg,
    Button
} from "reactstrap";
import sf from "sf";
import {Link} from "react-router-dom";

export const ApplicationItem = (props) => {
    const {
        appId,
        name,
        description,
        iconUrl,
        previewImageUrl,
        installed,

        onInstall,
        onUninstall
    } = props;

    const previewImage = (previewImageUrl !== null) ? previewImageUrl : sf("{0}{1}", assetUrl, "icons/image.svg")

    return (
        <Card className={"application mb-3"} title={description}>
            <CardHeader className={"d-flex justify-content-between application__header"}>
                <Link className={"application__header__link"} to={sf("/application/{0}/", appId)}>
                    <img className={"application__header__icon"} src={iconUrl} alt={iconUrl}/>
                    <p className={"application__header__title d-inline ml-3"}>{name}</p>
                </Link>

                <Button className={"application__header__button"}
                        color={installed ? "danger" : "primary"}
                        onClick={installed ? onUninstall : onInstall}
                        data-appid={appId}>
                    {installed ? "삭제" : "설치"}
                </Button>
            </CardHeader>

            <CardBody className={"d-flex flex-wrap align-items-center position-relative application__body"}>
                <CardImg className={
                    "application__body__image" + (previewImageUrl === null ? " application__body__image--gray" : "")
                }
                         src={previewImage}
                         alt={previewImage}/>
                <Link className={"application__body__link"} to={sf("/application/{0}/", appId)}/>
            </CardBody>
        </Card>

    )
};

ApplicationItem.propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconUrl: PropTypes.string,
    previewImageUrl: PropTypes.string,
    installed: PropTypes.bool.isRequired,

    onInstall: PropTypes.func.isRequired,
    onUninstall: PropTypes.func.isRequired
}

