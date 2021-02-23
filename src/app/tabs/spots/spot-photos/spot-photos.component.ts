import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISpot} from '../../../shared/interfaces/skatepark.interfaces';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-spot-photos',
    templateUrl: './spot-photos.component.html',
    styleUrls: ['./spot-photos.component.scss'],
})
export class SpotPhotosComponent implements OnInit {
    @Input() spot: ISpot;
    @Output() select$: EventEmitter<ISpot> = new EventEmitter<ISpot>();
    @Output() delete$: EventEmitter<string> = new EventEmitter<string>();
    constructor(
        private _modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    async editSpot() {
       this.select$.emit(this.spot);
    }

    deleteSpot(id: string) {
        this.delete$.next(id);
    }
}
