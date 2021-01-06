import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-add-spot',
  templateUrl: './modal-add-spot.component.html',
  styleUrls: ['./modal-add-spot.component.scss'],
})
export class ModalAddSpotComponent implements OnInit {

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }
}
