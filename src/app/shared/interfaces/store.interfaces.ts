import {IServerResponse} from "./common";

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
    }
}

export interface IGetStoresParams {
    page: number;
    filter?: string
}

export interface IGetStoresResponse extends IServerResponse{
    total_stores : number; // total number of stores
    total_count : number; // total number of stores matching search request
    stores: IStore[]
}
