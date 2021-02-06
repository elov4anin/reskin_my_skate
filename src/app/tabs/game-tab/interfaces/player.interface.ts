import {IServerResponse} from '../../../shared/interfaces/common';

export interface IPlayer {
    id: string;
    name: string;
    picture: string;
    email: string;
    username: string;
    linked?: boolean;
    _score?: number;
    _lives_left?: number;
    _playerID?: number;
}

export interface IPlayerSearchResponse extends IServerResponse {
    players: IPlayer[];
    searchrequest: string;
}
