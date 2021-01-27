import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ISlideInfo} from '../skateparks.interfaces';
import {ModalController} from '@ionic/angular';
import {ModalReportClosureComponent} from './modal-report-closure/modal-report-closure.component';
import {ISkatepark} from '../../../shared/interfaces/skatepark.interfaces';
import {CoreStore} from '../../../shared/store/core.store';
import {TRUE_VALUE} from '../../../shared/configs/main.config';
import {addToFeatures, prepareFeatures} from './feature.heper';


@Component({
    selector: 'app-skatepark-detail',
    templateUrl: './skatepark-detail.page.html',
    styleUrls: ['./skatepark-detail.page.scss'],
})
export class SkateparkDetailPage implements OnInit {
    isFavor = false;

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
        console.log(this.skatepark);
    }

    back() {
        this._location.back();
    }

    addFavourite(skatepark: ISkatepark) {
       skatepark.is_favourite = !skatepark.is_favourite;
    }

    async openModalReportClosure() {
        const modal = await this._modalController.create({
            component: ModalReportClosureComponent,
            cssClass: 'modal-report-closure'
        });
        return await modal.present();
    }
}
