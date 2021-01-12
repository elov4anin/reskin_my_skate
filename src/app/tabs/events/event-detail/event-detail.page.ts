import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ModalController} from "@ionic/angular";
import {ModalRatingsComponent} from "./modal-ratings/modal-ratings.component";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.page.html',
    styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

    constructor(
        private _location: Location,
        private _modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    back() {
        this._location.back();
    }

    async openModalRatings() {
        const modal = await this._modalController.create({
            component: ModalRatingsComponent,
            cssClass: 'modal-rating'
        });
        return await modal.present();
    }
}
