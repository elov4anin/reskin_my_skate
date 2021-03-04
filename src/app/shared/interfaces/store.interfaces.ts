import {IServerResponse} from './common';

export interface IStore {
    id: string;
    name: string;
    city: string;
    address_1: string;
    address_2: string;
    address_3: string;
    postcode: string;
    website: string;
    email: string;
    phone: string;
    is_featured: string; // "1" | "0"  , must boolean
    image: string;
    additional_info?: string;
    additional_info_header?: string;
}

export  class Store implements IStore {
    address_1: string;
    address_2: string;
    address_3: string;
    city: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    postcode: string;
    website: string;
    is_featured: string;
    image: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.city = '';
        this.address_1 = '';
        this.address_2 = '';
        this.address_3 = '';
        this.postcode = '';
        this.website = '';
        this.email = '';
        this.phone = '';
        this.is_featured = '0';
        this.image = '';
    }
}

export interface IGetStoresParams {
    page: number;
    filter?: string;
}

export interface IGetStoresResponse extends IServerResponse{
    total_stores: number; // total number of stores
    total_count: number; // total number of stores matching search request
    stores: IStore[];
}

export interface IGetDetailStoreByIdResponse {
    stores: IStore[];
}
