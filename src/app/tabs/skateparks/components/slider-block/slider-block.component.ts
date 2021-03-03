import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../tabs.enum';
import {ISkatepark} from '../../../../shared/interfaces/skatepark.interfaces';
import {StorageEnum} from '../../../../shared/store/Storage.enum';
import {CoreStore} from '../../../../shared/store/core.store';

@Component({
    selector: 'app-slider-block',
    templateUrl: './slider-block.component.html',
    styleUrls: ['./slider-block.component.scss'],
})
export class SliderBlockComponent implements OnInit {
    @Input() title: string = 'Example title';
    @Input() parks: ISkatepark[] = [];
    @Input() isNeedRating: boolean = false;

    @ViewChild('slider', {static: false}) sliderRef: IonSlides;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        width: 180
    };

    readonly defaultRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light');
    readonly activeRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary');

    constructor(
        private _router: Router,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
    }

    openSlide() {

    }

    async openSkatepark(skatepark: ISkatepark) {
        await this._coreStore.setValue(StorageEnum.SELECTED_SKATEPARK, skatepark);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, skatepark.id]);
    }
}
