import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalAddSpotComponent} from './modal-add-spot/modal-add-spot.component';
import {SpotService} from '../../shared/services/spot.service';
import {CoreStore} from '../../shared/store/core.store';

@Component({
    selector: 'app-spots',
    templateUrl: './spots.page.html',
    styleUrls: ['./spots.page.scss'],
})
export class SpotsPage implements OnInit {
    private page: number = 0;

    constructor(
        private _modalController: ModalController,
        private _spotService: SpotService,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
        this.getSpots();
    }

    async openAddSpotModal() {
        const modal = await this._modalController.create({
            component: ModalAddSpotComponent,
            cssClass: 'modal-add-spot'
        });
        return await modal.present();
    }

    getSpots() {
        this._spotService.getSpots(this._coreStore.state.profile.id, this.page).subscribe((res) => {
            console.log('res', res);
        });
    }
}
