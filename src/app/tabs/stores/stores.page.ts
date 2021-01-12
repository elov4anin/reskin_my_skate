import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../tabs.enum";

@Component({
    selector: 'app-stores',
    templateUrl: './stores.page.html',
    styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    sort() {

    }

    loadData($event: any) {

    }

    async openStore(storeId: number) {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.STORES, storeId])
    }
}
