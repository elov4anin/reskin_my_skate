import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-ratings',
  templateUrl: './modal-ratings.component.html',
  styleUrls: ['./modal-ratings.component.scss'],
})
export class ModalRatingsComponent implements OnInit {

  readonly defaultRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light');
  readonly activeRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary');

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }
}
