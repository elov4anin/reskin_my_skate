import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalTrickHowtoComponent} from './modal-trick-howto/modal-trick-howto.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GameRoutes} from '../../game-routes';
import {ITrick, Trick} from '../../interfaces/game.interfaces';
import {IPlayer} from '../../interfaces/player.interface';
import {GameHelper} from '../../classes/game.helper';
import {PlayersHelper} from '../../classes/players.helper';
import {CoreStore} from '../../../../shared/store/core.store';
import {ModalNailedComponent} from '../../modals/modal-nailed/modal-nailed.component';
import {ModalFailedComponent} from '../../modals/modal-failed/modal-failed.component';

@Component({
    selector: 'app-trick',
    templateUrl: './trick.page.html',
    styleUrls: ['./trick.page.scss'],
})
export class TrickPage implements OnInit {
    trickCount: number;
    currentPlayer: IPlayer;
    trick: ITrick = new Trick();

    constructor(
        private _modalController: ModalController,
        private _router: Router,
        private _route: ActivatedRoute,
        private _gameHelper: GameHelper,
        private _playerHelper: PlayersHelper,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
        this._route.queryParams.subscribe((params) => {
            this.trickCount = params.trickCount;
            this.currentPlayer = this._gameHelper.currentPlayerDetails(params.currentPlayer);
            this.setLives(this.currentPlayer.lives_left);
        });
        this._route.params.subscribe(async (params) => {
            if (params && params.id) {
                const tricks = this._coreStore.state.tricks;
                const candidateTrick = tricks.find(t => t.trick_id === params.id);
                if (candidateTrick) {
                    this.trick = candidateTrick;
                    await this._gameHelper.trickCompletedNew(params.id);
                }

            }
        });
    }

    getPlayerFailedLetter() {
        return this._gameHelper.playerFailLetter;
    }

    async openModalPlayTrick() {
        const modal = await this._modalController.create({
            component: ModalTrickHowtoComponent,
            cssClass: 'modal-add-players',
            componentProps: {
                trickUrl: this.trick.url
            }
        });
        await modal.present();
    }

    async stopGame() {
        await this._gameHelper.stopGame();
    }

    async openNailed() {
        const modal = await this._modalController.create({
            component: ModalNailedComponent,
            cssClass: 'modal-nailed',
            componentProps: {
                currentPlayer: this.currentPlayer
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.next) {
            const newScore = this.currentPlayer.score + 1;
            await this._playerHelper.setPlayerScore(this.currentPlayer.playerID, newScore);

            // check if there are anymore players
            await this.checkStatus();
            // await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.NAILED])
        }

    }

    async openFailed() {
        const modal = await this._modalController.create({
            component: ModalFailedComponent,
            cssClass: 'modal-failed',
            componentProps: {
                currentPlayer: {
                    ...this.currentPlayer,
                    lives_left: this.currentPlayer.lives_left - 1
                }
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.next) {
            if (this._gameHelper.playerFailLetter === 'E') {
                if (this._playerHelper.getInitialPlayers().length > 1) {
                    //  var failedPopup = $ionicPopup.alert({
                    //      title: $scope.currentPlayer.name + ' is out!',
                    //      templateUrl: 'templates/game-playerout-popup.html',
                    //      cssClass: 'myskate-game-popup failed'
                    //  });

                } else {
                    //  clearBack();
                    //  $state.go('app.game-winner');
                    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CONGRATULATIONS]);
                    return;
                }
            } else {
                // var failedPopup = $ionicPopup.alert({
                //     title: 'Failed It!',
                //     templateUrl: 'templates/game-failed-popup.html',
                //     cssClass: 'myskate-game-popup failed'
                // });
            }

            await this._playerHelper.removePlayerLives(this.currentPlayer.playerID);

            await this.checkStatus();
            // await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.FAILED]);
        }
    }

    setLives(livesLeft) {
        switch (livesLeft) {
            case 5:
                this._gameHelper.playerFailLetter = 'S';
                break;
            case 4:
                this._gameHelper.playerFailLetter = 'K';
                break;
            case 3:
                this._gameHelper.playerFailLetter = 'A';
                break;
            case 2:
                this._gameHelper.playerFailLetter = 'T';
                break;
            case 1:
                this._gameHelper.playerFailLetter = 'E';
                break;
        }
    }

    private async checkStatus() {
        if (this._playerHelper.getInitialPlayers().length > 1) {
            if (this._gameHelper.hasMorePlayers()) {
                // true
                const nextPlayer = this._gameHelper.loadNextPlayer();
                // can load player score page
                // or go straight to next player
                /// clearBack();
                // $state.go('app.play-trick',
                // { trick_count: $scope.trick_count, currentTrick: JSON.stringify($scope.trick), currentPlayer: nextplayer });
                await this._router.navigate(
                    ['/', GameRoutes.ROOT, GameRoutes.TRICK, this.trick.trick_id],
                    {queryParams: {trickCount: this.trickCount, currentPlayer: nextPlayer}}
                );
            } else {
                // false - end of level
                //  clearBack();
                // check if we have a winner and if there are any more tricks to play
                const hasWinner = await this._gameHelper.hasWinner();
                if (hasWinner) {
                    // true - return winner page
                    // $state.go('app.game-winner');
                    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CONGRATULATIONS]);
                } else {
                    // console.log('NOOOO winner yet');
                    // false- view current standings
                    // $state.go('app.current-standings');
                    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CURRENT]);
                }
            }
        } else {
            // single player
            // clearBack();
            // $state.go('app.current-standings');
            await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CURRENT]);
        }
    }
}
