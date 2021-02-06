import {Injectable} from '@angular/core';
import {PlayersHelper} from './players.helper';
import {GameService} from '../services/game.service';
import {ITrick} from '../interfaces/game.interfaces';
import {CoreStore} from '../../../shared/store/core.store';
import {StorageEnum} from '../../../shared/store/Storage.enum';

@Injectable({
    providedIn: 'root'
})
export class GameHelper {
    onGamePage: boolean;

    private currentPlayer: number = 0;
    private playersInGame = []; // reset everytime there is a new
    private difficulty = 0;
    private trickList: ITrick[] = [];
    private completedTricks: ITrick[] = [];

    constructor(
        private _playerHelper: PlayersHelper,
        private _gameService: GameService,
        private _coreStore: CoreStore,
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

    getTotalCompletedTricks() {
        return this.completedTricks.length;
    }

    hasTricks() {
        if (this.trickList.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    async selectTrick() {
        this.trickList = this._coreStore.state.tricks;
        const randomIndex = Math.floor(Math.random() * this.trickList.length);
        const nextTrick = this.trickList[randomIndex];
        // remove trick from list and add to completed tricks list
        await this.trickCompleted(randomIndex);

        return nextTrick;
    }

    async trickCompleted(index) {
        // get the trick from list
        const completed = this.trickList[index];
        this.completedTricks.push(completed);
        this.trickList.splice(index, 1);
        await this._coreStore.setValue(StorageEnum.TRICKS, this.trickList);
    }
}
