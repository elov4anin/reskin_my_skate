import { Component, OnInit } from '@angular/core';
import {ICheckBox} from "../../../../shared/components/checkbox-list/checkbox-list.component";
import {ModalController} from "@ionic/angular";
import {ModalSkateparkConfirmComponent} from "../modal-skatepark-confirm/modal-skatepark-confirm.component";

@Component({
  selector: 'app-modal-add-skatepark',
  templateUrl: './modal-add-skatepark.component.html',
  styleUrls: ['./modal-add-skatepark.component.scss'],
})
export class ModalAddSkateparkComponent implements OnInit {
  checkboxes: ICheckBox[] = [
    {
      label: 'Skatelite',
      checked: true
    },
    {
      label: 'Toilet',
      checked: true
    },
    {
      label: 'Store',
      checked: true
    },
    {
      label: 'Paid',
      checked: false
    },
    {
      label: 'Free',
      checked: true
    },
    {
      label: 'Undercover',
      checked: false
    },
    {
      label: 'Cafe',
      checked: false
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
