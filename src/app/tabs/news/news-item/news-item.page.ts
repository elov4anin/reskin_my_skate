import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.page.html',
  styleUrls: ['./news-item.page.scss'],
})
export class NewsItemPage implements OnInit {

  constructor(
      private _location: Location,
      private _modalController: ModalController) {
  }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
