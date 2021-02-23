import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalAddSpotComponent} from './modal-add-spot/modal-add-spot.component';
import {SpotService} from '../../shared/services/spot.service';
import {CoreStore} from '../../shared/store/core.store';
import {ISpot} from '../../shared/interfaces/skatepark.interfaces';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-spots',
    templateUrl: './spots.page.html',
    styleUrls: ['./spots.page.scss'],
})
export class SpotsPage implements OnInit, OnDestroy {
    spots: ISpot[] = [];

    private page: number = 0;
    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _modalController: ModalController,
        private _spotService: SpotService,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
        this.getSpots();
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async openAddSpotModal() {
        const modal = await this._modalController.create({
            component: ModalAddSpotComponent,
            cssClass: 'modal-add-spot'
        });
        return await modal.present();
    }

    getSpots() {
        this._spotService.getSpots(this._coreStore.state.profile.id, this.page)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe((res) => this.spots = res.spots
                // .filter(s => s.user_id === this._coreStore.state.profile.id)
       );
    }

    async editModal(spot: ISpot) {
        const modal = await this._modalController.create({
            component: ModalAddSpotComponent,
            cssClass: 'modal-add-spot',
            componentProps: {
                currentSpot: spot
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.success) {
            this.getSpots();
        }
    }

    async deleteSpot(spotId: string) {
        await this._spotService.deleteSpot(this._coreStore.state.profile.id, spotId);
        this.spots = this.spots.filter(s => s.id !== spotId);
    }
}
