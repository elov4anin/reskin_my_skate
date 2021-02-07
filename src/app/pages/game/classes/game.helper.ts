import {Injectable, OnDestroy} from '@angular/core';
import {PlayersHelper} from './players.helper';
import {GameService} from '../services/game.service';
import {ITrick} from '../interfaces/game.interfaces';
import {CoreStore} from '../../../shared/store/core.store';
import {StorageEnum} from '../../../shared/store/Storage.enum';
import {IPlayer} from '../interfaces/player.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../tabs/tabs.enum';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GameHelper implements OnDestroy {
    onGamePage: boolean;
    playerFailLetter: string; // @todo check

    private currentPlayer: number = 0;
    private playersInGame: IPlayer[] = []; // reset everytime there is a new
    private difficulty = 0;
    private trickList: ITrick[] = [];
    private completedTricks: ITrick[] = [];

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _playerHelper: PlayersHelper,
        private _gameService: GameService,
        private _coreStore: CoreStore,
        private _router: Router,
        ) {
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }


    resetTricksList(): void {
        this.completedTricks = [];
    }

    async initialLoad(): Promise<void> {
        // on initial load of game - when we set settings
        this.currentPlayer = 0;
        this.playersInGame = await this._playerHelper.getPlayersInGame();
    }

    setDifficultyLevel(difficultyLevel: number): void {
        this.difficulty = difficultyLevel;
    }

    getTricksList(difficulty): Promise<ITrick[]> {
        return new Promise(resolve => {
            this._gameService.getTrickList(difficulty)
                .pipe(takeUntil(this.componentDestroyed))
                .subscribe(response => {
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

    getTotalCompletedTricks(): number {
        return this.completedTricks.length;
    }

    hasTricks(): boolean {
        return this.trickList.length > 0;
    }

    async selectTrick(): Promise<ITrick> {
        this.trickList = this._coreStore.state.tricks;
        const randomIndex = Math.floor(Math.random() * this.trickList.length);
        // remove trick from list and add to completed tricks list
        return this.trickList[randomIndex];
    }

    /**
     * @deprecated trickCompleted
     * @param index
     */
    async trickCompleted(index): Promise<void> {
        // get the trick from list
        const completed = this.trickList[index];
        this.completedTricks.push(completed);
        this.trickList.splice(index, 1);
        await this._coreStore.setValue(StorageEnum.TRICKS, this.trickList);
    }

    async trickCompletedNew(trickId: string): Promise<void> {
        this.trickList = this.trickList.filter(t => t.trick_id !== trickId);
        await this._coreStore.setValue(StorageEnum.TRICKS, this.trickList);
    }

    currentPlayerDetails(current): IPlayer {
        if (this.playersInGame.length === 0) {
            this.playersInGame = this._coreStore.state.playersInGame;
        }
        if (this.currentPlayer === undefined) {
            return this.playersInGame[current];
        } else {
            return this.playersInGame[this.currentPlayer];
        }

    }

    hasMorePlayers(): boolean {
        const currentNumber = this.currentPlayer + 1;
        // get total number of players still in the game
        const totalPlayersLeft = this.playersInGame.length;
        return totalPlayersLeft !== currentNumber;
    }

   loadNextPlayer(): number {
        this.currentPlayer = this.currentPlayer + 1;
        return this.currentPlayer;
    }

    async hasWinner(): Promise<boolean> {
        this.playersInGame = await this._playerHelper.getPlayersInGame();
        const playerListLength = this.playersInGame.length;
        if (playerListLength > 1) {
            // we haven't found our winner yet
            // check if there are any more tricks
            return this.trickList.length <= 0;
        } else {
            // we have a winner
            return true;
        }
    }

    async singlePlayerFinished(): Promise<boolean> {
        if (this.playersInGame.length === 0) {
            this.playersInGame = await this._coreStore.getValue(StorageEnum.PLAYERS_IN_GAME);
        }

        if (this.currentPlayer === undefined) {
            this.currentPlayer = 0;
        }
        if (this.playersInGame[this.currentPlayer].lives_left > 0) {
            // players still has lives left
            // check if there are any tricks left otherwise go through tricks again
            if (this.trickList.length > 0) {
                // console.log('still has tricks');
                return false;
            } else {
                // no more tricks
                this.trickList = await this._coreStore.getValue(StorageEnum.ORIGINAL_TRICKS);
                await this._coreStore.setValue(StorageEnum.TRICKS, this.trickList);
                return false;
            }
        } else {
            return true;
        }
    }


    findWinner(): IPlayer[] {
        const players: IPlayer[] = this._playerHelper.getInitialPlayers();
        console.log('players', players);
        const winners: IPlayer[] = [];
        const ultimateWinner: IPlayer[] = [];
        if (players.length > 1) {
            players.forEach((p) => {
                if (p.lives_left > 0) {
                    // add to winners list
                    winners.push(p);
                }
            });
        } else {
            winners.push(players[0]);
        }
        if (winners.length > 1) {
            // multiple winners - so check who has the highest score
            let higherScore = 0;
            winners.forEach(item => {
                if (item.score > higherScore) {
                    higherScore = item.score;
                }
            });
            winners.forEach(item => {
                if (item.score === higherScore) {
                    ultimateWinner.push(item);
                }
            });
            console.log('ultimateWinner', ultimateWinner);
            return ultimateWinner;
        } else {
            console.log('winners', winners);
            return winners;
        }
    }

    addResultOnLeaderboard(winners: IPlayer[]): void {
        this._gameService.addResults(winners)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe();
    }

    clearGameHelper() {
        this.playerFailLetter = '';
        this.currentPlayer = 0;
        this.playersInGame = []; // reset everytime there is a new
        this.difficulty = 0;
        this.trickList = [];
        this.completedTricks = [];
    }
    async stopGame(needRedirect: boolean = true){
        this._playerHelper.clearPlayers();
        this.clearGameHelper();
        await this._coreStore.removeValue(StorageEnum.PLAYERS);
        await this._coreStore.removeValue(StorageEnum.PLAYERS_IN_GAME);
        await this._coreStore.removeValue(StorageEnum.TRICKS);
        await this._coreStore.removeValue(StorageEnum.ORIGINAL_TRICKS);
        await this._coreStore.removeValue(StorageEnum.SELECTED_DIFFICULTY);
        await this._coreStore.removeValue(StorageEnum.CURRENT_TRICK);
        await this._coreStore.removeValue(StorageEnum.GAME_PLAYERS);
        if (needRedirect) {
            await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]);
        }
    }
}
