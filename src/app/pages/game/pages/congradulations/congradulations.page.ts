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

        if (this.winners.length > 0) {
            this._gameHelper.addResultOnLeaderboard(this.winners);

        }
    }

    async stopGame() {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]);
    }

    async playAgain() {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]);
    }

    async openLeaderboard() {
        const modal = await this._modalController.create({
            component: ModalLeaderboardComponent,
            cssClass: 'modal-leaderboard'
        });
        return await modal.present();
    }
}
