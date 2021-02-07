import { Component, OnInit } from '@angular/core';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../../tabs/tabs.enum';
import {GameRoutes} from '../../game-routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nailed',
  templateUrl: './nailed.page.html',
  styleUrls: ['./nailed.page.scss'],
})
/**
 * @deprecated
 */
export class NailedPage implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async stopGame() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]);
  }

  async nextPlayer() {
    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.FAILED]);
  }
}
