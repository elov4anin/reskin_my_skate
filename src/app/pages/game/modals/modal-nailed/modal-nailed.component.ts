import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IPlayer} from '../../interfaces/player.interface';

@Component({
    selector: 'app-modal-nailed',
    templateUrl: './modal-nailed.component.html',
    styleUrls: ['./modal-nailed.component.scss'],
})
export class ModalNailedComponent implements OnInit {
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
