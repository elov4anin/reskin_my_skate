import {IUserShortInfo} from "./common";

export interface IGetFeedbackListByParkIdResponse {
    feed: IFeedback[];
}

export interface IFeedback {
    date: string; // DD-MM-YYYY HH:mm
    datetimestamp: string;
    id: string;
    image: string;
    park_id: string;
    post: string;
    user: IUserShortInfo;
    user_id: string;
    video: string;
}
