import {Component, OnInit} from '@angular/core';
import {CoreStore} from '../../../../shared/store/core.store';
import {PlayersHelper} from '../../classes/players.helper';
import {GameHelper} from '../../classes/game.helper';
import {LoadingController} from '@ionic/angular';
import {StorageEnum} from '../../../../shared/store/Storage.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {GameRoutes} from '../../game-routes';
import {ITrick} from '../../interfaces/game.interfaces';

@Component({
    selector: 'app-load-trick-controller',
    templateUrl: './load-trick-controller.component.html',
    styleUrls: ['./load-trick-controller.component.scss'],
})
export class LoadTrickControllerComponent implements OnInit {


    constructor(
        private _coreStore: CoreStore,
        private _playersHelper: PlayersHelper,
        private _gameHelper: GameHelper,
        private _loadingController: LoadingController,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
    }

    async ngOnInit() {
        await this.init();
        this._route.queryParams.subscribe(async (params) => {
            if (params.hash) {
                await this.init();
            }
        });
    }

    private async init() {
        await this.presentLoading();
        this._gameHelper.onGamePage = true;
        await this.checkTricks();
        await this.playTrick();
    }

    private async checkTricks() {
        const difficulty = this._coreStore.state.selectedDifficulty;
        const selectedTrickTypes = this._coreStore.state.selectedTrickTypes;
        const trickCount = this._gameHelper.getTotalCompletedTricks();
        const hasTricks = this._gameHelper.hasTricks();
        if (hasTricks) {
            // has tricks list loaded
            // console.log('tricks has', hasTricks);
        } else {

            if (trickCount > 0) {
                // list has already been loaded once
                // console.log('tricks count', trick_count);
            } else {
                // are the tricks to pick from
                const tricks = await this._gameHelper.getTricksList(difficulty, selectedTrickTypes);
                await this._coreStore.setValue(StorageEnum.TRICKS, tricks);
                await this._coreStore.setValue(StorageEnum.ORIGINAL_TRICKS, tricks);
            }
        }
    }

    async playTrick() {
        const currentTrick: ITrick = await this._gameHelper.selectTrick();
        await this._coreStore.setValue(StorageEnum.CURRENT_TRICK, currentTrick);
        const trickCount = this._gameHelper.getTotalCompletedTricks();
        await this._gameHelper.initialLoad();
        await this.dismissLoaders();
        if (!currentTrick) {
            await this._gameHelper.stopGame(true);
            return;
        }
        await this._router.navigate(
            ['/', GameRoutes.ROOT, GameRoutes.TRICK, currentTrick.trick_id], {queryParams: {trickCount, currentPlayer: 0}});
    }

    private async presentLoading() {
        const loading = await this._loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Selecting trick...',
            duration: 2000
        });
        await loading.present();
    }

    private async dismissLoaders() {
        const element = await this._loadingController.getTop();
        if (element) {
            await element.dismiss();
            return;
        }
    }
}
