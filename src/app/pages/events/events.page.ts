import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../shared/modules/tabs/tabs.enum";

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async openEvent(eventId: number) {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.EVENTS, eventId])
  }
}
