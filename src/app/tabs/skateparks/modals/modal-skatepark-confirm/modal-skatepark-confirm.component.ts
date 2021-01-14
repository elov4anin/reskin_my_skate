import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-skatepark-confirm',
  templateUrl: './modal-skatepark-confirm.component.html',
  styleUrls: ['./modal-skatepark-confirm.component.scss'],
})
export class ModalSkateparkConfirmComponent implements OnInit {

  constructor(private _modalController: ModalController) {
  }

  ngOnInit() {
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

}
