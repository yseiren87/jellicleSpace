import{
    APPLICATION_PAGE__INIT,
    APPLICATION_PAGE__CHANGING_QUERY,
} from "../../keys";
import {defaultAction} from "../../utils";

export const applicationPageInit = () => defaultAction(APPLICATION_PAGE__INIT);

export const applicationChangingQuery = (value) => defaultAction(APPLICATION_PAGE__CHANGING_QUERY, value);