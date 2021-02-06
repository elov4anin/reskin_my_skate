import {IServerResponse} from '../../../shared/interfaces/common';

export interface ITrick {
    difficulty_level: string;
    group_name: string;
    name: string;
    trick_id: string;
    url: string;
}

export class Trick implements ITrick {
    difficulty_level: string;
    group_name: string;
    name: string;
    trick_id: string;
    url: string;
    constructor() {
        this.difficulty_level = '';
        this.group_name = '';
        this.name = '';
        this.trick_id = '';
        this.url = '';
    }
}

export interface IGetTrickListResponse extends IServerResponse {
    tricks: ITrick[];
}
