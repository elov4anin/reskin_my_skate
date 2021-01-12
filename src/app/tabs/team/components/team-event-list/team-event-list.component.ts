import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../tabs.enum";

@Component({
  selector: 'app-team-event-list',
  templateUrl: './team-event-list.component.html',
  styleUrls: ['./team-event-list.component.scss'],
})
export class TeamEventListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async openEvent(eventId: number) {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.EVENTS, eventId])
  }

}
