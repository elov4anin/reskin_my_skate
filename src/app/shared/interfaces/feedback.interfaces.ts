import {IUserShortInfo} from './common';

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
    rating: number;
}

export interface IAddFeedParams {
    park: string;
    post: string;
    type: 'post';
    user: string;
}
export interface IAddRatingParams {
    park: string;
    rating: number;
    user: string;
}
