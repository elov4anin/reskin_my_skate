import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CoreStore} from "../../../shared/store/core.store";
import {IFeatureSkatepark} from "../../../shared/interfaces/skatepark.interfaces";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-modal-filter-skateparks',
  templateUrl: './modal-filter-skateparks.component.html',
  styleUrls: ['./modal-filter-skateparks.component.scss'],
})
export class ModalFilterSkateparksComponent implements OnInit {

  checkboxes: IFeatureSkatepark[] =[];

  constructor(
      private _modalController: ModalController,
      private _coreStore: CoreStore,
      private _fb: FormBuilder
      ) { }

  ngOnInit() {
    this.checkboxes = this._coreStore.state.skateparkFeatures;
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  applyFilter() {
  }
}
