import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ModalController} from "@ionic/angular";
import {ModalRatingsComponent} from "./modal-ratings/modal-ratings.component";
import {CoreStore} from "../../../shared/store/core.store";
import {IEvent} from "../../../shared/interfaces/team.interfaces";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.page.html',
    styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
    event: IEvent;

    constructor(
        private _location: Location,
        private _modalController: ModalController,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
        this.event = this._coreStore.state.selectedEvent;
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
