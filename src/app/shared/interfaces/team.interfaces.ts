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
    time: string;
    date_timestamp: string;
    date_formatted: string;
    description: string;
    name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    postcode: string;
    id: string;
    image: string;
    website: string;
}

export interface IGetFeedListResponse extends IServerResponse{
    feed: IFeedNews[];
}


export interface IGetEventListResponse extends IServerResponse{
    events: IEvent[];
}
