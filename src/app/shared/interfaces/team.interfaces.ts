import {IServerResponse, IUserShortInfo} from "./common";

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

export interface IEvent {
    date: string; // April 14, 2020, 2:55 pm
    date_formatted: string;
    name: string
    address_line_1: string;
    city: string;
    postcode: string
    id: string;
    image: string;
}

export interface IGetFeedListResponse extends IServerResponse{
    feed: IFeedNews[];
}


export interface IGetEventListResponse extends IServerResponse{
    events: IEvent[];
}
