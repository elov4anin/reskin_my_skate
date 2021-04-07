import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IPlayer} from '../../interfaces/player.interface';
import {GameHelper} from '../../classes/game.helper';

@Component({
    selector: 'app-modal-nailed',
    templateUrl: './modal-nailed.component.html',
    styleUrls: ['./modal-nailed.component.scss'],
})
export class ModalNailedComponent implements OnInit {
    @Input() currentPlayer: IPlayer;

    constructor(
        private _modalController: ModalController,
        private _gameHelper: GameHelper,
    ) {
    }

    ngOnInit() {
    }

    async nextPlayer() {
        await this._modalController.dismiss({next: true});
    }

    async stopGame() {
        await this._gameHelper.stopGame();
        await this._modalController.dismiss();
    }
}
