import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ICheckBox} from "../../../shared/components/checkbox-list/checkbox-list.component";

@Component({
  selector: 'app-modal-filter-skateparks',
  templateUrl: './modal-filter-skateparks.component.html',
  styleUrls: ['./modal-filter-skateparks.component.scss'],
})
export class ModalFilterSkateparksComponent implements OnInit {

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

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }
}
