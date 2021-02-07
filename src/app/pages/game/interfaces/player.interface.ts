import {IServerResponse} from '../../../shared/interfaces/common';

export interface IPlayer {
    id: string;
    name: string;
    picture: string;
    email: string;
    username: string;
    linked?: boolean;
    score?: number;
    lives_left?: number;
    playerID?: number;
}

export interface IPlayerSearchResponse extends IServerResponse {
    players: IPlayer[];
    searchrequest: string;
}
