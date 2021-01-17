import {Component, OnInit} from '@angular/core';
import {difficulties} from './difficulties';
import {IDifficulty} from "./difficulty.interface";
import {ModalController} from "@ionic/angular";
import {ModalHowtoComponent} from "./modals/modal-howto/modal-howto.component";
import {ModalAddPlayersComponent} from "./modals/modal-add-players/modal-add-players.component";
import {Router} from "@angular/router";
import {GameRoutes} from "../../pages/game/game-routes";
import {IFeatureSkatepark} from "../../shared/interfaces/skatepark.interfaces";

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
    players: any[] = [1, 2, 3];

    constructor(private _modalController: ModalController, private _router: Router) {
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
    }

    async addPlayer() {
        const modal = await this._modalController.create({
            component: ModalAddPlayersComponent,
            cssClass: 'modal-add-players',
            componentProps: {
                players: this.players
            }
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            this.players = data.players
        }
    }

    async startGame() {
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.TRICK])
    }
}
