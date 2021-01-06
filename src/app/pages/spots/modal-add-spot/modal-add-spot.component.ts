import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ICheckBox} from "../../../shared/components/checkbox-list/checkbox-list.component";

@Component({
    selector: 'app-modal-add-spot',
    templateUrl: './modal-add-spot.component.html',
    styleUrls: ['./modal-add-spot.component.scss'],
})
export class ModalAddSpotComponent implements OnInit {
    checkboxes: ICheckBox[] = [
        {
            label: 'Curb',
            checked: true
        },
        {
            label: 'Rail',
            checked: false
        },
        {
            label: 'Steps',
            checked: true
        },
        {
            label: 'Other',
            checked: false
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
