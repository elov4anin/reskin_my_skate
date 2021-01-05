import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'app-search-skateparks',
    templateUrl: './search-skateparks.page.html',
    styleUrls: ['./search-skateparks.page.scss'],
})
export class SearchSkateparksPage implements OnInit {

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
