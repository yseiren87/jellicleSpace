import {
    APPLICATION_DETAIL_PAGE__INIT,
    APPLICATION_DETAIL_PAGE__RUN
} from "../../keys";
import {defaultAction} from "../../utils";


export const applicationDetailPageInit = () => defaultAction(APPLICATION_DETAIL_PAGE__INIT);

export const applicationDetailRun = () => defaultAction(APPLICATION_DETAIL_PAGE__RUN);