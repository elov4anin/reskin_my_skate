import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ISlideInfo} from '../skateparks.interfaces';
import {ModalController} from '@ionic/angular';
import {ModalReportClosureComponent} from './modal-report-closure/modal-report-closure.component';
import {ISkatepark} from '../../../shared/interfaces/skatepark.interfaces';
import {CoreStore} from '../../../shared/store/core.store';
import {TRUE_VALUE} from '../../../shared/configs/main.config';
import {addToFeatures, prepareFeatures} from './feature.heper';
import {ModalRatingsComponent} from './modal-ratings/modal-ratings.component';
import {SkateparksService} from '../../../shared/services/skateparks.service';
import {ModalLocationOnMapComponent} from '../../../shared/modals/modal-location-on-map/modal-location-on-map.component';
import {ModalAddSkateparkComponent} from '../modals/modal-add-skatepark/modal-add-skatepark.component';
import {SKATEPARK_CRUD_MODAL_ID} from '../../../shared/configs/modals.constant';


@Component({
    selector: 'app-skatepark-detail',
    templateUrl: './skatepark-detail.page.html',
    styleUrls: ['./skatepark-detail.page.scss'],
})
export class SkateparkDetailPage implements OnInit {

    readonly defaultRatingColor: string = getComputedStyle(document.documentElement)
        .getPropertyValue('--ion-color-light');
    readonly activeRatingColor: string = getComputedStyle(document.documentElement)
        .getPropertyValue('--ion-color-secondary');
    featuresSlides: ISlideInfo[] = [];

    skatepark: ISkatepark;
    slides: ISlideInfo[] = [];

    constructor(
        private _location: Location,
        private _modalController: ModalController,
        private _coreStore: CoreStore,
        private _skateParkService: SkateparksService
        ) {
    }

    ngOnInit() {
        this.skatepark = this._coreStore.state.selectedSkatepark;
        this.featuresSlides =  prepareFeatures(this.skatepark);
        this.featuresSlides = addToFeatures(this.skatepark, this.featuresSlides);

        if (this.skatepark.has_images === TRUE_VALUE) {
            this.slides = this.skatepark.images.map(image => {
                return {imgSrc: image};
            });
        }
    }

    back() {
        this._location.back();
    }

    async addFavourite(skatepark: ISkatepark) {
       skatepark.is_favourite = !skatepark.is_favourite;
       if (skatepark.is_favourite) {
           await this._skateParkService.saveParkFavourite(this._coreStore.state.profile.id, skatepark.id);
       } else {
           await this._skateParkService.deleteParkFavourite(this._coreStore.state.profile.id, skatepark.id);
       }
    }

    async openModalReportClosure() {
        const modal = await this._modalController.create({
            component: ModalReportClosureComponent,
            cssClass: 'modal-report-closure',
            componentProps: {
                skateparkId: this.skatepark.id
            }
        });
        return await modal.present();
    }

    async openModalRatings() {
        const modal = await this._modalController.create({
            component: ModalRatingsComponent,
            cssClass: 'modal-rating',
            componentProps: {
                park: this.skatepark
            }
        });
        return await modal.present();
    }

    async showLocation() {
        const modal = await this._modalController.create({
            component: ModalLocationOnMapComponent,
            cssClass: 'modal-rating',
            componentProps: {
                park: this.skatepark,
                coordinates: {
                    lat: this.skatepark.latitude,
                    lng:  this.skatepark.longitude,
                }
            }
        });
        return await modal.present();
    }

    async openEditParkModal() {
        const modal = await this._modalController.create({
            component: ModalAddSkateparkComponent,
            cssClass: 'modal-add-spot',
            id: SKATEPARK_CRUD_MODAL_ID,
            componentProps: {
                park: this.skatepark
            }
        });
        return await modal.present();
    }
}
