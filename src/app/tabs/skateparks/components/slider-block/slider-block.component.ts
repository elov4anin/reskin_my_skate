import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../tabs.enum';
import {ISkatepark} from '../../../../shared/interfaces/skatepark.interfaces';

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

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    openSlide() {

    }

    async openSkatepark(parkId: string) {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, parkId]);
    }
}
