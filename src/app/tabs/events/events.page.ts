import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../shared/services/team.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {IEvent} from "../../shared/interfaces/team.interfaces";

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  events: IEvent[] = [];

  isDisableLoadMore: boolean = false;

  private componentDestroyed: Subject<any> = new Subject();
  private page: number = 0;

  constructor(
      private _team: TeamService,
      ) { }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  getEvents() {
    this._team.getEventList(this.page).pipe(takeUntil(this.componentDestroyed))
        .subscribe(res => this.events = this.events.concat(res.events))

  }

  loadMore() {
    this.page++;
    this._team.getEventList(this.page).pipe(takeUntil(this.componentDestroyed))
        .subscribe(res => {
          this.events = this.events.concat(res.events);
          if (res.events.length < 10) {
            this.isDisableLoadMore = true
          }
        })
  }
}
