import {Component, OnInit} from '@angular/core';
import {difficulties} from './difficulties';
import {IDifficulty} from "./difficulty.interface";
import {ICheckBox} from "../../shared/components/checkbox-list/checkbox-list.component";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    readonly difficulties = difficulties;
    checkboxes: ICheckBox[] = [
        {
            label: 'Straight, Spin, Shove Tricks',
            checked: true
        },
        {
            label: 'Rail & Ledge Tricks',
            checked: true
        },
        {
            label: 'Ramp Tricks',
            checked: true
        },
        {
            label: 'Flip Tricks',
            checked: true
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

    openHowPlayModal() {

    }

    selectDifficulty(d: IDifficulty) {
        this.difficulties.forEach(v => v.isSelected = false);
        d.isSelected = true;
    }
}
