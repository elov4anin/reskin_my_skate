import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalSkateparkConfirmComponent} from "../modal-skatepark-confirm/modal-skatepark-confirm.component";
import {IFeatureSkatepark} from "../../../../shared/interfaces/skatepark.interfaces";

@Component({
  selector: 'app-modal-add-skatepark',
  templateUrl: './modal-add-skatepark.component.html',
  styleUrls: ['./modal-add-skatepark.component.scss'],
})
export class ModalAddSkateparkComponent implements OnInit {
  checkboxes: IFeatureSkatepark[] = [
    {
      name: 'Skatelite',
      checked: true,
      value: 'skatelite'
    },
    {
      name: 'Toilet',
      checked: true,
      value: 'toilet'
    },
    {
      name: 'Store',
      checked: true,
      value: 'store'
    },
    {
      name: 'Paid',
      checked: false,
      value: 'paid'
    },
    {
      name: 'Free',
      checked: true,
      value: 'free'
    },
    {
      name: 'Undercover',
      checked: false,
      value: 'undercover'
    },
    {
      name: 'Cafe',
      checked: false,
      value: 'cafe'
    },
  ];

  constructor(private _modalController: ModalController) {
  }

  ngOnInit() {
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  async confirmSave() {
    const modal = await this._modalController.create({
      component: ModalSkateparkConfirmComponent,
      cssClass: 'modal-confirm'
    });
    return await modal.present();
  }
}
