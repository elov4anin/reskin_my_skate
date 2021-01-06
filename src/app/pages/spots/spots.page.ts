import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalAddSpotComponent} from "./modal-add-spot/modal-add-spot.component";

@Component({
    selector: 'app-spots',
    templateUrl: './spots.page.html',
    styleUrls: ['./spots.page.scss'],
})
export class SpotsPage implements OnInit {

    constructor(
        private _modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    async openAddSpotModal() {
        const modal = await this._modalController.create({
            component: ModalAddSpotComponent,
            cssClass: 'modal-add-spot'
        });
        return await modal.present();
    }
}
