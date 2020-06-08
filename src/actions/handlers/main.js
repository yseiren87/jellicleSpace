import {
    MAIN_PAGE__INIT,
    MAIN_PAGE__RUN,
} from "../../keys";
import {defaultAction} from "../../utils";

export const mainPageInit = () => defaultAction(MAIN_PAGE__INIT);

export const mainRun = (value) => defaultAction(MAIN_PAGE__RUN, value);