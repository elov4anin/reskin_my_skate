import {Injectable} from '@angular/core';
import {PlayersHelper} from './players.helper';
import {GameService} from '../services/game.service';
import {ITrick} from '../interfaces/game.interfaces';

@Injectable({
    providedIn: 'root'
})
export class GameHelper {

    private currentPlayer: number = 0;
    private playersInGame = []; // reset everytime there is a new
    private difficulty = 0;
    private trickList: ITrick[] = [];
    private completedTricks: ITrick[] = [];

    constructor(
        private _playerHelper: PlayersHelper,
        private _gameService: GameService,
        ) {
    }


    resetTricksList() {
        this.completedTricks = [];
    }

    async initialLoad(){
        // on initial load of game - when we set settings
        this.currentPlayer = 0;
        this.playersInGame = await this._playerHelper.getPlayersInGame();
    }

    setDifficultyLevel(difficultyLevel: number): void {
        this.difficulty = difficultyLevel;
    }

    getTricksList(difficulty): Promise<ITrick[]> {
        return new Promise(resolve => {
            this._gameService.getTrickList(difficulty).subscribe(response => {
                if (response.tricks.length > 0) {
                    this.trickList = response.tricks;
                } else {
                    this.trickList = [];
                }
                this.completedTricks = [];
                resolve(this.trickList);
            });
        });
    }
}
