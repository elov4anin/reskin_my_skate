import {IUserShortInfo} from "./common";

export interface IFeedNews {
    content: string;
    date: string; // April 14, 2020, 2:55 pm
    id: string;
    image: string;
    link: string;
    title: string;
    user: IUserShortInfo;
    video: string;
}

export interface IGetFeedListResponse {
    feed: IFeedNews[];
}
