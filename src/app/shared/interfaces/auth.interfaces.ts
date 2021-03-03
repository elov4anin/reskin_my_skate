import {IServerResponse} from './common';

export interface ILoginResponse extends IServerResponse {
    user: IUser;
}

export interface IUser {
    bio: string;
    date: string;
    dob: string;
    email: string;
    firstname: string;
    fullname: string;
    gender: string;
    id: string;
    lastname: string;
    marital_status: string;
    picture: string;
    status: string;
    telephone: string;
    user_type: string ;
    weblink: string;
    // GetUserData
    cardno?: string;
    postcode?: string;
    club_id?: string;
    member_id?: string;
    location?: string;
}

export interface IGetUserDataResponse extends IUser {
    response_msg: string;
}

export interface IEditUserDataParams {
    userid: string;
    data: {
        firstname: string
        lastname: string
        telephone?: string
        bio?: string
        weblink?: string
        dob: string
        gender: string
    };
}
