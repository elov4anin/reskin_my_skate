import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ISlideInfo} from "../skateparks.interfaces";
import { featuresSlides } from './features_demodata';


@Component({
  selector: 'app-skatepark-detail',
  templateUrl: './skatepark-detail.page.html',
  styleUrls: ['./skatepark-detail.page.scss'],
})
export class SkateparkDetailPage implements OnInit {
  isFavor: boolean = false;

  readonly defaultRatingColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-color-light');
  readonly activeRatingColor: string = getComputedStyle(document.documentElement)
      .getPropertyValue('--ion-color-secondary');
  featuresSlides: ISlideInfo[] = featuresSlides;
  constructor(private _location: Location) { }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

  addFavourite() {
    console.log(this.isFavor)
    this.isFavor = !this.isFavor;
  }
}
