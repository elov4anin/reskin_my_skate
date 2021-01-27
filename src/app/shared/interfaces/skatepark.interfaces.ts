import {ICoordinates, IServerResponse} from "./common";

export interface ISearchLocationsResponse {
    parks: string[]
}

export interface ISkatepark {
    id:            string;
    external_id:   string;
    name:          string;
    url:           string;
    city:          string;
    address:       string;
    longitude:     string;
    latitude:      string;
    status:        string;
    month_opened:  null;
    year_opened:   null;
    has_images:    string;
    concrete:      string;
    free:          string;
    indoors:       string;
    metal:         string;
    outdoors:      string;
    paid:          string;
    skatelite:     string;
    undercover:    string;
    wood:          string;
    toilet:        string;
    cafe:          string;
    store:         string;
    lighting:      string;
    locker:        string;
    relaxing_area: string;
    viewing_area:  string;
    lessons:       string;
    images:        string[];
    rating:        number;
    is_favourite?: boolean;
    modified_at:   string; // What format date? (DD-MM-YYYY HH:mm) created_at ?
    _isNew?:       boolean;
}

export interface ISkateparkFilterParams {
    coordinates?: ICoordinates;
    type?: 'outdoors' | 'indoors'; //@todo  'outdoors' | 'indoors'
    features?: string[];
    location: string;
    material?: 'concrete' | 'wood';
    page?: number;
}

export interface IGetParksByLocation {
    parks: ISkatepark[];
}

export interface IFeatureSkatepark {
    checked: boolean;
    name: string;
    value: any;
}

export interface IGetFeaturesResponse {
    features: IFeatureSkatepark[]
}

export interface IUserLastCheckInResponse {
    checkins: any[];
    user_checked_in_recently: boolean;
}

export interface IAddSkateparkParams {
    name: string;
    city: string;
    address: string;
    postcode: string;
    latitude: string;
    longitude: string;
    website: string;
    material: 'concrete' | 'wood';
    type: 'outdoors' | 'indoors';
    skatelite: boolean;
    features: string[];
    image?: any;
}

export interface IAddSkateParkResponse extends IServerResponse  {
    // response_code: 200
    sent: boolean
}
