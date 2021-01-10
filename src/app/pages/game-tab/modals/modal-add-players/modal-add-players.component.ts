import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-add-players',
  templateUrl: './modal-add-players.component.html',
  styleUrls: ['./modal-add-players.component.scss'],
})
export class ModalAddPlayersComponent implements OnInit {
  @Input() players: any[];

  constructor(
      private _modalController: ModalController
  ) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }

  removePlayer() {
    this.players.pop()
  }

  addPlayer() {

  }

  async savePlayers() {
    await this._modalController.dismiss({
      players: this.players
    });
  }

  showProfile() {

  }
}
