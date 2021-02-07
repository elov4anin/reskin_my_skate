import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../../tabs/tabs.enum';
import {GameRoutes} from '../../game-routes';
import {GameHelper} from '../../classes/game.helper';
import {PlayersHelper} from '../../classes/players.helper';
import {IPlayer} from '../../interfaces/player.interface';
import {uuid4} from '@capacitor/core/dist/esm/util';

@Component({
    selector: 'app-current-standings',
    templateUrl: './current-standings.page.html',
    styleUrls: ['./current-standings.page.scss'],
})
export class CurrentStandingsPage implements OnInit {
    onGamePage = true;
    stillPlaying = true;
    players: IPlayer[] = [];

    constructor(
        private _router: Router,
        private _gameHelper: GameHelper,
        private _playerHelper: PlayersHelper,
    ) {
    }

    async ngOnInit() {
        await this.init();
        this.players = this._playerHelper.getInitialPlayers().sort((a, b) => b.score - a.score);
    }

    private async init(): Promise<void> {
        await this._gameHelper.initialLoad();
        if (this._playerHelper.getInitialPlayers()) {
            const hasWinner = await this._gameHelper.hasWinner();
            this.stillPlaying = !hasWinner;
        } else {
            const singlePlayerFinished = await this._gameHelper.singlePlayerFinished();
            this.stillPlaying = !singlePlayerFinished;
        }
    }

    async stopGame() {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]);
    }

    async nexTrick() {
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CONTROLLER], {queryParams: {hash: uuid4()}});
    }

    async openLeaderboard() {
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CONGRADULATIONS]);
    }
}
