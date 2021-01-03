import { Component, OnInit } from '@angular/core';
import { sliders } from './demodata';
import {ISlideInfo} from "./skateparks.interfaces";

@Component({
  selector: 'app-skateparks',
  templateUrl: './skateparks.page.html',
  styleUrls: ['./skateparks.page.scss'],
})
export class SkateparksPage implements OnInit {

  sliders: ISlideInfo[] = sliders;

  constructor() { }

  ngOnInit() {
  }

}
