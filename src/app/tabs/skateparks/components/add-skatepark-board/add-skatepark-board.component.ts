import { Component, OnInit } from '@angular/core';
import {ModalAddSkateparkComponent} from "../../modals/modal-add-skatepark/modal-add-skatepark.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-add-skatepark-board',
  templateUrl: './add-skatepark-board.component.html',
  styleUrls: ['./add-skatepark-board.component.scss'],
})
export class AddSkateparkBoardComponent implements OnInit {

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async openModalAddSkatepark() {
    const modal = await this._modalController.create({
      component: ModalAddSkateparkComponent,
      cssClass: 'modal-add-spot',
      id: 'addSkateparkId'
    });
    return await modal.present();
  }
}
