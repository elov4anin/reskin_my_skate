import {IServerResponse} from '../../../shared/interfaces/common';

export interface ITrick {
    difficulty_level: string;
    group_name: string;
    name: string;
    trick_id: string;
    url: string;
}

export interface IGetTrickListResponse extends IServerResponse {
    tricks: ITrick[];
}
