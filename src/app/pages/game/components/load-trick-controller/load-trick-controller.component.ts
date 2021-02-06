import {Component, OnInit} from '@angular/core';
import {CoreStore} from '../../../../shared/store/core.store';
import {PlayersHelper} from '../../classes/players.helper';
import {GameHelper} from '../../classes/game.helper';
import {LoadingController} from '@ionic/angular';
import {StorageEnum} from '../../../../shared/store/Storage.enum';
import {Router} from '@angular/router';
import {GameRoutes} from '../../game-routes';
import {ITrick} from '../../interfaces/game.interfaces';
import {TabsEnum} from '../../../../tabs/tabs.enum';

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
    ) {
    }

    async ngOnInit() {
        await this.presentLoading();
        this._gameHelper.onGamePage = true;
        await this.init();
        await this.playTrick();
    }

    private async init() {
        const difficulty = this._coreStore.state.selectedDifficulty;
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
                const tricks = await this._gameHelper.getTricksList(difficulty);
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
            await this._router.navigate(
                ['/', TabsEnum.GAME]);
        }
        await this._router.navigate(
            ['/', GameRoutes.ROOT, GameRoutes.TRICK, currentTrick.trick_id], {queryParams: {trickCount, currentPlayer: 0}});
        // $timeout(function () {
        //     clearBack();
        //     GameService.InitialLoad();
        //     $state.go('app.play-trick', { trick_count: trick_count, currentTrick: JSON.stringify($scope.currentTrick), currentPlayer: 0});
        // }, 3000);
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
