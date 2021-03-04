import {Component, OnInit} from '@angular/core';
import {difficulties} from './difficulties';
import {IDifficulty} from '../../pages/game/interfaces/difficulty.interface';
import {LoadingController, ModalController} from '@ionic/angular';
import {ModalHowtoComponent} from './modals/modal-howto/modal-howto.component';
import {ModalAddPlayersComponent} from './modals/modal-add-players/modal-add-players.component';
import {Router} from '@angular/router';
import {GameRoutes} from '../../pages/game/game-routes';
import {IFeatureSkatepark} from '../../shared/interfaces/skatepark.interfaces';
import {IPlayer} from '../../pages/game/interfaces/player.interface';
import {CoreStore} from '../../shared/store/core.store';
import {PlayersHelper} from '../../pages/game/classes/players.helper';
import {GameHelper} from '../../pages/game/classes/game.helper';
import {StorageEnum} from '../../shared/store/Storage.enum';

@Component({
    selector: 'app-game',
    templateUrl: './game-tab.page.html',
    styleUrls: ['./game-tab.page.scss'],
})
export class GameTabPage implements OnInit {

    difficulties = difficulties;
    checkboxes: IFeatureSkatepark[] = [
        {
            name: 'Straight, Spin, Shove Tricks',
            checked: true,
            value: 'Straight, Spin, Shove Tricks'
        },
        {
            name: 'Rail & Ledge Tricks',
            checked: false,
            value: 'Rail & Ledge Tricks'
        },
        {
            name: 'Ramp Tricks',
            value: 'Ramp Tricks',
            checked: true
        },
        {
            name: 'Flip Tricks',
            checked: false,
            value: 'Flip Tricks'
        },
    ];
    selectedDifficulty: number;
    players: IPlayer[] = [];

    constructor(
        private _modalController: ModalController,
        private _router: Router,
        private _coreStore: CoreStore,
        private _playersHelper: PlayersHelper,
        private _gameHelper: GameHelper,
        private _loadingController: LoadingController,
        ) {
    }

    ngOnInit() {
    }

    async openHowPlayModal() {
        const modal = await this._modalController.create({
            component: ModalHowtoComponent,
            cssClass: 'modal-howto'
        });
        return await modal.present();
    }

    selectDifficulty(d: IDifficulty) {
        this.difficulties.forEach(v => v.isSelected = false);
        d.isSelected = true;
        this.selectedDifficulty = d.id;
    }

    async addPlayer() {
        const modal = await this._modalController.create({
            component: ModalAddPlayersComponent,
            cssClass: 'modal-add-players',
            componentProps: {
                players: this.players.map(p => p)
            }
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            this.players = data.players;
        }
    }

    async startGame() {
        try {
            const selectedTrickTypes: string[] = this.checkboxes.filter(ch => ch.checked).map(ch => ch.value);
            await this.presentLoading();
            this._playersHelper.setInitialPlayers(this.players);
            await this._gameHelper.initialLoad();
            await this._gameHelper.resetTricksList();
            await this._gameHelper.setDifficultyLevel(this.selectedDifficulty);
            const tricks = await this._gameHelper.getTricksList(this.selectedDifficulty, selectedTrickTypes);
            await this._coreStore.setValue(StorageEnum.TRICKS, tricks);
            await this._coreStore.setValue(StorageEnum.ORIGINAL_TRICKS, tricks);
            await this._coreStore.setValue(StorageEnum.SELECTED_DIFFICULTY, this.selectedDifficulty);
            await this.dismissLoaders();
            await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CONTROLLER]);
        } catch (e) {
            await this.dismissLoaders();
            console.log('error start', e);
        }
        // clearBack();
    }

    private async presentLoading() {
        const loading = await this._loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Starting game...',
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

    ionViewDidEnter() {
        const user = this._coreStore.state.profile;
        this.players = [];
        this.players.push({
            id:  user.id,
            name: user.firstname,
            picture: user.picture,
            email: user.email,
            username: user.email,
            linked: true,
        });
        console.log('2', this.players);
    }

    ionViewDidLeave() {
        this.selectedDifficulty = undefined;
        this.players = [];
        this.difficulties.forEach(v => v.isSelected = false);
    }

}
