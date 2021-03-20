import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CoreStore} from '../../store/core.store';
import {ICoordinates} from '../../interfaces/common';
import {ISkatepark} from '../../interfaces/skatepark.interfaces';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-modal-location-on-map',
  templateUrl: './modal-location-on-map.component.html',
  styleUrls: ['./modal-location-on-map.component.scss'],
})
export class ModalLocationOnMapComponent implements OnInit {
  @Input() coordinates: ICoordinates;
  @Input() park: ISkatepark;
  location$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
      public coreStore: CoreStore,
      private _modalController: ModalController,
  ) { }

  ngOnInit() {
    this.location$.next(this.park.address);
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

}
