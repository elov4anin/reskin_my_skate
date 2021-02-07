import {IServerResponse} from '../../../shared/interfaces/common';
import {IPlayer} from './player.interface';

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

export interface IAddToLeaderboardResponse extends IServerResponse {
    winner: IPlayer[];
    winnerid: string;
}
