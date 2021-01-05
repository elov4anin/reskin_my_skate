import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {getEnumAsArray} from "../../../shared/helpers/utils";
import {SegmentsEnum, segmentsEnum2LabelMapping} from "./segments.enum";
import {ModalController} from "@ionic/angular";
import {ModalFilterSkateparksComponent} from "./modal-filter-skateparks/modal-filter-skateparks.component";

@Component({
    selector: 'app-search-skateparks',
    templateUrl: './search-skateparks.page.html',
    styleUrls: ['./search-skateparks.page.scss'],
})
export class SearchSkateparksPage implements OnInit {
    readonly segmentsEnum = SegmentsEnum;
    readonly segments = getEnumAsArray(SegmentsEnum);
    readonly segmentsEnum2LabelMapping = segmentsEnum2LabelMapping;

    selectedSegment: SegmentsEnum = SegmentsEnum.LIST;

    constructor(
        private _location: Location,
        private _modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    search($event: any) {

    }

    back() {
        this._location.back();
    }

    async openFilter() {
        const modal = await this._modalController.create({
            component: ModalFilterSkateparksComponent,
            cssClass: 'modal-filter-skateparks'
        });
        return await modal.present();
    }

    segmentChanged($event: any) {

    }

    loadData($event: any) {

    }
}
