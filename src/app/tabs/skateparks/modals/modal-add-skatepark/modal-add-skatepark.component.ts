import { Component, OnInit } from '@angular/core';
import {ICheckBox} from "../../../../shared/components/checkbox-list/checkbox-list.component";
import {ModalController} from "@ionic/angular";

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

}
