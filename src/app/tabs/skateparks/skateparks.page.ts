import { Component, OnInit } from '@angular/core';
import { sliders } from './demodata';
import {ISlideInfo} from "./skateparks.interfaces";
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../tabs.enum";
import {SKATEPARKS_ROUTES} from "./skatepars-routers.enum";
import {ModalFilterSkateparksComponent} from "../../pages/search-skateparks/modal-filter-skateparks/modal-filter-skateparks.component";
import {ModalController} from "@ionic/angular";
import {ModalLocationListComponent} from "../../shared/modals/modal-location-list/modal-location-list.component";


@Component({
  selector: 'app-skateparks',
  templateUrl: './skateparks.page.html',
  styleUrls: ['./skateparks.page.scss'],
})
export class SkateparksPage implements OnInit {

  sliders: ISlideInfo[] = sliders;

  constructor(
      private _router: Router,
      private _modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async openSearchPage(evt) {

    const modal = await this._modalController.create({
      component: ModalLocationListComponent,
      cssClass: 'modal-location-skateparks',
      componentProps: {
        search: evt.detail.value
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this._router.navigate(
          ['/', SKATEPARKS_ROUTES.SEARCH],
          {queryParams: {search: data.selectedLocation}})
    }


  }

}
