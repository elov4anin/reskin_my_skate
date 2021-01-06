import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { sliders } from 'src/app/pages/skateparks/demodata';
import {ISlideInfo} from "../../../skateparks/skateparks.interfaces";

@Component({
  selector: 'app-add-photos-slider',
  templateUrl: './add-photos-slider.component.html',
  styleUrls: ['./add-photos-slider.component.scss'],
})
export class AddPhotosSliderComponent implements OnInit {
  @Input() sliders: ISlideInfo[] = sliders;
  @ViewChild('upload') uploadRef: ElementRef;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
    width: 60,
  };
  constructor() { }

  ngOnInit() {}

  uploadImage($event: Event) {

  }

  triggerUploadImage() {
    this.uploadRef.nativeElement.click();
  }
}
