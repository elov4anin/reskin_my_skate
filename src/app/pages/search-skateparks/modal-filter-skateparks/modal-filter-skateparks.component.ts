import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CoreStore} from "../../../shared/store/core.store";
import {IFeatureSkatepark, ISkateparkFilterParams} from "../../../shared/interfaces/skatepark.interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TYPES} from "./dictionaries";
import {SURFACES} from "./surfaces";
import {FilterSkateparksHelper} from "./filter-skateparks.helper";


@Component({
  selector: 'app-modal-filter-skateparks',
  templateUrl: './modal-filter-skateparks.component.html',
  styleUrls: ['./modal-filter-skateparks.component.scss'],
})
export class ModalFilterSkateparksComponent implements OnInit {
  @Input() filterState: ISkateparkFilterParams;

  readonly types: IFeatureSkatepark[] = TYPES
  readonly surfaces: IFeatureSkatepark[] = SURFACES;

  checkboxes: IFeatureSkatepark[] =[];
  form: FormGroup;

  constructor(
      private _modalController: ModalController,
      private _coreStore: CoreStore,
      private _fb: FormBuilder,
      private _filterHelper: FilterSkateparksHelper,
      ) { }

  ngOnInit() {
    if (this.filterState) {
      this.creatForm(this.filterState);
    }
    this.checkboxes = this._coreStore.state.skateparkFeatures;
  }

  private creatForm(filterState: ISkateparkFilterParams) {
    this.form = this._fb.group({
      type: filterState.type ? filterState.type: 'indoor',
      material: filterState.material ? filterState.material: '',
      features: [filterState.features.length > 0 ? filterState.features: []],
    })
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  async applyFilter() {
    await this._modalController.dismiss({filter: {
        ...this.form.value,
        location: this.filterState.location,
        coordinates: this.filterState.coordinates
      }});
  }
}
