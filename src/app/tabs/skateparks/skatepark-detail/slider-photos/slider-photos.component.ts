import {Component, Input, OnInit} from '@angular/core';
import { sliders } from '../../demodata';
import {ISlideInfo} from "../../skateparks.interfaces";

@Component({
  selector: 'app-slider-photos',
  templateUrl: './slider-photos.component.html',
  styleUrls: ['./slider-photos.component.scss'],
})
export class SliderPhotosComponent implements OnInit {
  @Input() sliders: ISlideInfo[] = sliders;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
    width: 375,
  };
  constructor() { }

  ngOnInit() {}

}
