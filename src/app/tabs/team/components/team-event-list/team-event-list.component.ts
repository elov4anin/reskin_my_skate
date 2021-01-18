import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../tabs.enum";
import {IEvent} from "../../../../shared/interfaces/team.interfaces";
import {TeamService} from "../../../../shared/services/team.service";
import {CoreStore} from "../../../../shared/store/core.store";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IonInfiniteScroll} from "@ionic/angular";
import {StorageEnum} from "../../../../shared/enums/Storage.enum";

@Component({
    selector: 'app-team-event-list',
    templateUrl: './team-event-list.component.html',
    styleUrls: ['./team-event-list.component.scss'],
})
export class TeamEventListComponent implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    events: IEvent[] = [];

    private componentDestroyed: Subject<any> = new Subject();
    private page: number = 0
    private breakLoadMore: boolean = false

    constructor(
        private _teamService: TeamService,
        private _coreStore: CoreStore,
        private _router: Router,
    ) {
    }

    ngOnInit() {
    }

    getEvents() {
        this._teamService.getEventList(this.page)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(res => {
                if (res.events.length === 0) {
                    this.breakLoadMore = true;
                    this.infiniteScroll.complete().then()
                }
                this.events = this.events.concat(res.events)
                this.page = this.page + 1;
            })
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async openEvent(event: IEvent) {
        await this._coreStore.setValue(StorageEnum.SELECTED_NEWS, event);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.EVENTS, event.id])
    }

    loadData($event: any) {
        if (this.breakLoadMore) {
            $event.target.disabled = true
            return
        } else {
            this.getEvents();
        }
    }
}
