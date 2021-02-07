import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from '../../interfaces/player.interface';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-failed',
  templateUrl: './modal-failed.component.html',
  styleUrls: ['./modal-failed.component.scss'],
})
export class ModalFailedComponent implements OnInit {
  @Input() currentPlayer: IPlayer;

  constructor(
      private _modalController: ModalController,
  ) {
  }

  ngOnInit() {
  }

  async nextPlayer() {
    await this._modalController.dismiss({next: true});
  }

  stopGame() {

  }

}
