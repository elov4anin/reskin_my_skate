import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-howto',
  templateUrl: './modal-howto.component.html',
  styleUrls: ['./modal-howto.component.scss'],
})
export class ModalHowtoComponent implements OnInit {

  constructor(
      private _modalController: ModalController
  ) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }

}
