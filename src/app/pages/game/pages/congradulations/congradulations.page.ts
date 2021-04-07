import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../../tabs/tabs.enum';
import {GameRoutes} from '../../game-routes';
import {ModalController} from '@ionic/angular';
import {ModalLeaderboardComponent} from '../../modals/modal-leaderboard/modal-leaderboard.component';
import {IPlayer} from '../../interfaces/player.interface';
import {GameHelper} from '../../classes/game.helper';
import {PlayersHelper} from '../../classes/players.helper';

@Component({
    selector: 'app-congradulations',
    templateUrl: './congradulations.page.html',
    styleUrls: ['./congradulations.page.scss'],
})
export class CongradulationsPage implements OnInit {

    initialPlayerCount: number = 0;
    winners: IPlayer[] = [];

    constructor(
        private _router: Router,
        private _modalController: ModalController,
        private _gameHelper: GameHelper,
        private _playerHelper: PlayersHelper,
    ) {
    }

    async ngOnInit() {
        this.initialPlayerCount = this._playerHelper.getInitialPlayers().length;
        this.winners = this._gameHelper.findWinner();
        console.log('winners', this.winners);

        if (this.winners.length > 0) {
            this._gameHelper.addResultOnLeaderboard(this.winners);

        }
        await this._gameHelper.stopGame(false);
    }

    async stopGame() {
        await this._gameHelper.stopGame();
    }

    async playAgain() {
        await this.stopGame();
    }

    async openLeaderboard() {
        const modal = await this._modalController.create({
            component: ModalLeaderboardComponent,
            cssClass: 'modal-leaderboard',
            componentProps: {
                winner: this.winners[0],
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.again) {
            await this.playAgain();
        }
    }
}
