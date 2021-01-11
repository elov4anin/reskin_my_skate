import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-leaderboard',
  templateUrl: './modal-leaderboard.component.html',
  styleUrls: ['./modal-leaderboard.component.scss'],
})
export class ModalLeaderboardComponent implements OnInit {
  players: any = [1, 2, 3, ,4, 5, 5, 6, 7, 8, 9,7, 4, 4, 2, 3, ,4, 5, 5, 6, 7, 8, 9,7, 4, 4];

  constructor(
      private _modalController: ModalController
  ) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }

  playAgain() {
    this.closeModal().then()
  }
}
