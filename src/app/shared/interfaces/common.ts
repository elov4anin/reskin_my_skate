export interface IServerResponse {
    response_code?: string;
    response_msg: string;
    success: boolean;
}

export interface IClubStatusResponse {
    id: string;
    status: string;
}

export interface ICoordinates {
    lat: number;
    lng: number;
}

export interface IAddressWithPostalCode {
    address: string;
    postcode: string;
    latitude?: number;
    longitude?: number;
}

export interface IUserShortInfo {
    name: string;
    picture: string;
}

export interface  IGetUserRatingResponse {
    rating: {
        has_rating: boolean;
    }
}
