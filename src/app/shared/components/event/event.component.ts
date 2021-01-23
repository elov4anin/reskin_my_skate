import {Component, Input, OnInit} from '@angular/core';
import {IEvent} from "../../interfaces/team.interfaces";
import {StorageEnum} from "../../enums/Storage.enum";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../tabs/tabs.enum";
import {Router} from "@angular/router";
import {CoreStore} from "../../store/core.store";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent {
    @Input() event: IEvent;

    constructor(
        private _router: Router,
        private _coreStore: CoreStore,
    ) {
    }

    async openEvent(event: IEvent) {
        await this._coreStore.setValue(StorageEnum.SELECTED_NEWS, event);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.EVENTS, event.id]);
    }
}
