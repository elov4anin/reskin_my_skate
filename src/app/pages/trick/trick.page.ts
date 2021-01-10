import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalTrickHowtoComponent} from "./modal-trick-howto/modal-trick-howto.component";

@Component({
    selector: 'app-trick',
    templateUrl: './trick.page.html',
    styleUrls: ['./trick.page.scss'],
})
export class TrickPage implements OnInit {

    constructor(private _modalController: ModalController) {
    }

    ngOnInit() {
    }

    async openModalPlayTrick() {
        const modal = await this._modalController.create({
            component: ModalTrickHowtoComponent,
            cssClass: 'modal-add-players',
        });
        await modal.present();
    }

    stopGame() {

    }
}
