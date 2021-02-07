import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../../tabs/tabs.enum";
import {GameRoutes} from "../../game-routes";

@Component({
  selector: 'app-failed',
  templateUrl: './failed.page.html',
  styleUrls: ['./failed.page.scss'],
})
/**
 * @deprecated
 */
export class FailedPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async stopGame() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME])
  }

  async nextPlayer() {
    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.CURRENT])
  }
}
