import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player.interface';
import {CoreStore} from '../../../shared/store/core.store';
import {StorageEnum} from '../../../shared/store/Storage.enum';

@Injectable({
    providedIn: 'root'
})
export class PlayersHelper {
    gamePlayers: IPlayer[] = [];

    constructor(private _coreStore: CoreStore) {
    }

    setInitialPlayers(players: IPlayer[]): void {
        this.gamePlayers = this.gamePlayers.concat(players.map((p, idx) => {
            return {
                ...p,
                _score: 0,
                _lives_left: 5,
                _playerID: idx + 1
            };
        }));
    }

    async getPlayersInGame(): Promise<IPlayer[]>{
        // this is the list of players still in the game - that havent been kicked out yet
        // need so we know which players to loop through

        const playersInGame: IPlayer[] = [];
        if (this.gamePlayers.length === 0) {
            this.gamePlayers = await this._coreStore.getValue(StorageEnum.PLAYERS);
            console.log('game player in game', this.gamePlayers);
        }
        if (!this.gamePlayers) {
            this.gamePlayers = [];
        }

        this.gamePlayers.forEach(p => {
            if (p._lives_left !== 0) {
                playersInGame.push(p);
            }
        });
        await this._coreStore.setValue(StorageEnum.PLAYERS_IN_GAME, playersInGame);
        return playersInGame;
    }

    async setPlayerScore(playerID, score): Promise<void> {
        this.gamePlayers.forEach((p) => {
            if (p._playerID === playerID) {
                p._score = score;
            }
        });
        await this._coreStore.setValue(StorageEnum.GAME_PLAYERS, this.gamePlayers);
    }

    getInitialPlayers() {
        if (this.gamePlayers.length === 0) {
            this.gamePlayers = this._coreStore.state.players;
        }
        if (!this.gamePlayers) {
            this.gamePlayers = [];
        }
        return this.gamePlayers;
    }

    async removePlayerLives(playerID) {
        this.gamePlayers.forEach((p) => {
            if (p._playerID === playerID) {
                p._lives_left = p._lives_left - 1;
            }
        });
        await this._coreStore.setValue(StorageEnum.PLAYERS, this.gamePlayers);
    }
}
