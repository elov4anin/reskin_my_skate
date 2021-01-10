import {Component, OnInit} from '@angular/core';
import { difficulties } from './difficulties';
import {IDifficulty} from "./difficulty.interface";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    readonly difficulties = difficulties;

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
