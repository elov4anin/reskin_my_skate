import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IEvent} from "../../../../shared/interfaces/team.interfaces";
import {TeamService} from "../../../../shared/services/team.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IonInfiniteScroll} from "@ionic/angular";

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
    ) {
    }

    ngOnInit() {
        this.getEvents();
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


    loadData($event: any) {
        if (this.breakLoadMore) {
            $event.target.disabled = true
            return
        } else {
            this.getEvents();
        }
    }
}
