import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ISlideInfo} from "../skateparks.interfaces";
import {IonSlides} from "@ionic/angular";

@Component({
    selector: 'app-slider-block',
    templateUrl: './slider-block.component.html',
    styleUrls: ['./slider-block.component.scss'],
})
export class SliderBlockComponent implements OnInit {
    @Input() title: string = 'Example title';
    @Input() sliders: ISlideInfo[] = [];
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

    constructor() {
    }

    ngOnInit() {
    }

    openSlide() {

    }
}
