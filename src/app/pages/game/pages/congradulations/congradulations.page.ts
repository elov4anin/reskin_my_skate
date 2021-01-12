import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../../tabs/tabs.enum";
import {GameRoutes} from "../../game-routes";
import {ModalController} from "@ionic/angular";
import {ModalLeaderboardComponent} from "../../modals/modal-leaderboard/modal-leaderboard.component";

@Component({
  selector: 'app-congradulations',
  templateUrl: './congradulations.page.html',
  styleUrls: ['./congradulations.page.scss'],
})
export class CongradulationsPage implements OnInit {
  constructor(private _router: Router, private _modalController: ModalController) { }

  ngOnInit() {
  }

  async stopGame() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME])
  }

  async playAgain() {
    await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.TRICK])
  }

  async openLeaderboard() {
    const modal = await this._modalController.create({
      component: ModalLeaderboardComponent,
      cssClass: 'modal-leaderboard'
    });
    return await modal.present();
  }
}
