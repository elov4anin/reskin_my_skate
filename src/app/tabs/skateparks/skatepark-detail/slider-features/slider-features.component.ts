import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ISlideInfo} from "../../skateparks.interfaces";
import {IonSlides} from "@ionic/angular";

@Component({
  selector: 'app-slider-features',
  templateUrl: './slider-features.component.html',
  styleUrls: ['./slider-features.component.scss'],
})
export class SliderFeaturesComponent implements OnInit {
  @Input() title: string = 'Features';
  @Input() slides: ISlideInfo[] = [];
  @Input() isNeedRating: boolean = false;

  @ViewChild('slider') sliderRef: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    width: 80
  };

  readonly defaultRatingColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-color-light');
  readonly activeRatingColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-color-secondary');
  progress: number = 0;

  constructor() { }

  ngOnInit() {
  }

  async ionSlideDidChange() {
    const idx = await this.sliderRef.getActiveIndex()
    if (idx > this.slides.length) {
      this.progress = 0;
      return;
    }
    this.progress = idx / this.slides.length
  }
}
