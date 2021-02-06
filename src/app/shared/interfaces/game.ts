import {IServerResponse} from './common';
import {IPlayer} from '../../pages/game/interfaces/player.interface';

export interface IGameSettings {
    originalTricks: string[]; // @todo
    tricks: string[]; // @todo
    players: string[];
    playersInGame: string;
}


export interface IFindPlayerByEmailResponse extends IServerResponse{
    searchrequest: string;
    players: IPlayer[];
}
