import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {CoreStore} from "../../../shared/store/core.store";
import {IFeedNews} from "../../../shared/interfaces/team.interfaces";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.page.html',
  styleUrls: ['./news-item.page.scss'],
})
export class NewsItemPage implements OnInit {

  news: IFeedNews;

  constructor(
      private _location: Location,
      private _coreStore: CoreStore,
      ) {
  }

  ngOnInit() {
    this.news = this._coreStore.state.selectedNews;
  }

  back() {
    this._location.back();
  }

}
