import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CoreStore} from "../../../shared/store/core.store";
import {IFeatureSkatepark} from "../../../shared/interfaces/skatepark.interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TYPES} from "./dictionaries";
import {SURFACES} from "./surfaces";


@Component({
  selector: 'app-modal-filter-skateparks',
  templateUrl: './modal-filter-skateparks.component.html',
  styleUrls: ['./modal-filter-skateparks.component.scss'],
})
export class ModalFilterSkateparksComponent implements OnInit {

  readonly types: IFeatureSkatepark[] = TYPES
  readonly surfaces: IFeatureSkatepark[] = SURFACES;

  checkboxes: IFeatureSkatepark[] =[];
  form: FormGroup;

  constructor(
      private _modalController: ModalController,
      private _coreStore: CoreStore,
      private _fb: FormBuilder
      ) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: 'indoors',
      material: '',
      features: [['paid',]]
    })
    this.checkboxes = this._coreStore.state.skateparkFeatures;
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  applyFilter() {
    console.log(this.form.value)
  }
}
