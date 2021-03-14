import { Component } from '@angular/core';
import {ModalAddSpotComponent} from '../../../spots/modal-add-spot/modal-add-spot.component';
import {ModalController} from '@ionic/angular';
import {SPOT_CRUD_MODAL_ID} from '../../../../shared/configs/modals.constant';

@Component({
  selector: 'app-add-spot-board',
  templateUrl: './add-spot-board.component.html',
  styleUrls: ['./add-spot-board.component.scss'],
})
export class AddSpotBoardComponent{

  constructor(private _modalController: ModalController) { }

  async openAddSpotModal() {
    const modal = await this._modalController.create({
      component: ModalAddSpotComponent,
      cssClass: 'modal-add-spot',
      id: SPOT_CRUD_MODAL_ID,
    });
    return await modal.present();
  }

}
