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

export class EventImpl implements IEvent {
    address_line_1: string;
    address_line_2: string;
    city: string;
    date: string;
    date_formatted: string;
    date_timestamp: string;
    description: string;
    id: string;
    image: string;
    name: string;
    postcode: string;
    time: string;
    website: string;

    constructor() {
        this.address_line_1 = '';
        this.address_line_2 = '';
        this.city = '';
        this.date = '';
        this.date_formatted = '';
        this.date_timestamp = '';
        this.description = '';
        this.id = '';
        this.image = '';
        this.name = '';
        this.postcode = '';
        this.time = '';
        this.website = '';
    }
}

export interface IGetFeedListResponse extends IServerResponse{
    feed: IFeedNews[];
}


export interface IGetEventListResponse extends IServerResponse{
    events: IEvent[];
}
