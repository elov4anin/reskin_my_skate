import {ICoordinates} from "./common";

export interface ISearchLocationsResponse {
    parks: string[]
}

export interface IShortInfoFromSearchSkatepark {
    id: string;
    name: string;
    location: string;
    rating: number;
    lastUpdateDate: string
    linkPhoto: string;
    lat: number;
    long: number;
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
    value: string;
}

export interface IGetFeaturesResponse {
    features: IFeatureSkatepark[]
}

export interface IUserLastCheckInResponse {
    checkins: any[];
    user_checked_in_recently: boolean;
}