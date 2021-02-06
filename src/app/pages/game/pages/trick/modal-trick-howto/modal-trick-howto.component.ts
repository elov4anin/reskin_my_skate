import {Component, Input, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';


@Component({
    selector: 'app-modal-trick-howto',
    templateUrl: './modal-trick-howto.component.html',
    styleUrls: ['./modal-trick-howto.component.scss'],
})
export class ModalTrickHowtoComponent implements OnInit {
    @Input() trickUrl: string;

    constructor(
        public platform: Platform,
        private _modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    async closeModal() {
        await this._modalController.dismiss();
    }


    getTrickUrl() {
        const list = this.trickUrl.split('/');
        const key = list[list.length - 1];
        return `https://www.youtube.com/embed/${key}`;
    }
}
