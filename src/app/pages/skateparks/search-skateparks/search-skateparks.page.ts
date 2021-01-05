import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {getEnumAsArray} from "../../../shared/helpers/utils";
import {SegmentsEnum, segmentsEnum2LabelMapping} from "./segments.enum";

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
    ) {
    }

    ngOnInit() {
    }

    search($event: any) {

    }

    back() {
        this._location.back();
    }

    openFilter() {

    }

    segmentChanged($event: any) {
        
    }
}
