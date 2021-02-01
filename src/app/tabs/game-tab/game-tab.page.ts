import {Component, OnInit} from '@angular/core';
import {difficulties} from './difficulties';
import {IDifficulty} from './interfaces/difficulty.interface';
import {ModalController} from '@ionic/angular';
import {ModalHowtoComponent} from './modals/modal-howto/modal-howto.component';
import {ModalAddPlayersComponent} from './modals/modal-add-players/modal-add-players.component';
import {Router} from '@angular/router';
import {GameRoutes} from '../../pages/game/game-routes';
import {IFeatureSkatepark} from '../../shared/interfaces/skatepark.interfaces';
import {IPlayer} from './interfaces/player.interface';
import {CoreStore} from '../../shared/store/core.store';

@Component({
    selector: 'app-game',
    templateUrl: './game-tab.page.html',
    styleUrls: ['./game-tab.page.scss'],
})
export class GameTabPage implements OnInit {

    readonly difficulties = difficulties;
    checkboxes: IFeatureSkatepark[] = [
        {
            name: 'Straight, Spin, Shove Tricks',
            checked: true,
            value: 'Straight, Spin, Shove Tricks'
        },
        {
            name: 'Rail & Ledge Tricks',
            checked: true,
            value: 'Rail & Ledge Tricks'
        },
        {
            name: 'Ramp Tricks',
            value: 'Ramp Tricks',
            checked: true
        },
        {
            name: 'Flip Tricks',
            checked: true,
            value: 'Flip Tricks'
        },
    ];
    selectedDifficulty: number;
    players: IPlayer[] = [];

    constructor(
        private _modalController: ModalController,
        private _router: Router,
        private _coreStore: CoreStore,
        ) {
    }

    ngOnInit() {
        const user = this._coreStore.state.profile;
        this.players.push({
            id:  user.id,
            name: user.firstname,
            picture: user.picture,
            email: user.email,
            username: user.email,
            linked: true,
        });
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
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.TRICK]);
    }
}
