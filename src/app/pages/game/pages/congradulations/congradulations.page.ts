import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../../shared/modules/tabs/tabs.enum";
import {GameRoutes} from "../../game-routes";

@Component({
  selector: 'app-congradulations',
  templateUrl: './congradulations.page.html',
  styleUrls: ['./congradulations.page.scss'],
})
export class CongradulationsPage implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async stopGame() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME])
  }

  async playAgain() {
    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.TRICK])
  }

  openLeaderboard() {

  }
}
