import { Component, OnInit } from '@angular/core';
import { sliders } from './demodata';
import {ISlideInfo} from "./skateparks.interfaces";
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../shared/modules/tabs/tabs.enum";
import {SKATEPARKS_ROUTES} from "./skatepars-routers.enum";


@Component({
  selector: 'app-skateparks',
  templateUrl: './skateparks.page.html',
  styleUrls: ['./skateparks.page.scss'],
})
export class SkateparksPage implements OnInit {

  sliders: ISlideInfo[] = sliders;

  constructor(
      private _router: Router,
  ) { }

  ngOnInit() {
  }

  async openSearchPage(evt) {
    await this._router.navigate(
        ['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, SKATEPARKS_ROUTES.SEARCH],
        {queryParams: {searchValue: evt.detail.value}})

  }

}
