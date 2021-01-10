import { Component, OnInit } from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";


@Component({
  selector: 'app-modal-trick-howto',
  templateUrl: './modal-trick-howto.component.html',
  styleUrls: ['./modal-trick-howto.component.scss'],
})
export class ModalTrickHowtoComponent implements OnInit {

  constructor(
      public platform: Platform,
      private _modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async closeModal() {
    await this._modalController.dismiss();
  }


}
