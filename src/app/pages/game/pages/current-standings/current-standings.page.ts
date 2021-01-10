import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../../shared/modules/tabs/tabs.enum";
import {GameRoutes} from "../../game-routes";

@Component({
  selector: 'app-current-standings',
  templateUrl: './current-standings.page.html',
  styleUrls: ['./current-standings.page.scss'],
})
export class CurrentStandingsPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async stopGame() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME])
  }

  async nexTrick() {
    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.TRICK])
  }
}
