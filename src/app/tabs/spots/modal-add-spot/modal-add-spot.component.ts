import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {IFeatureSkatepark} from "../../../shared/interfaces/skatepark.interfaces";

@Component({
    selector: 'app-modal-add-spot',
    templateUrl: './modal-add-spot.component.html',
    styleUrls: ['./modal-add-spot.component.scss'],
})
export class ModalAddSpotComponent implements OnInit {
    checkboxes: IFeatureSkatepark[] = [
        {
            name: 'Curb',
            checked: true,
            value: 'Curb'
        },
        {
            name: 'Rail',
            checked: false,
            value: 'Rail'
        },
        {
            name: 'Steps',
            checked: true,
            value: 'Steps'
        },
        {
            name: 'Other',
            checked: false,
            value: 'Other'
        },
    ];

    constructor(private _modalController: ModalController) {
    }

    ngOnInit() {
    }

    async closeModal() {
        await this._modalController.dismiss();
    }
}
