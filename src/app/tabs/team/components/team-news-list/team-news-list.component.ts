import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../../shared/services/team.service";
import {Subject} from "rxjs";
import {IFeedNews} from "../../../../shared/interfaces/team.interfaces";
import {takeUntil} from "rxjs/operators";
import {CoreStore} from "../../../../shared/store/core.store";
import {StorageEnum} from "../../../../shared/enums/Storage.enum";
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../tabs.enum";

@Component({
  selector: 'app-team-news-list',
  templateUrl: './team-news-list.component.html',
  styleUrls: ['./team-news-list.component.scss'],
})
export class TeamNewsListComponent implements OnInit {
  items: IFeedNews[] = []

  private componentDestroyed: Subject<any> = new Subject();

  constructor(
      private _teamService: TeamService,
      private _coreStore: CoreStore,
      private _router: Router,
      ) { }

  ngOnInit() {
    this._teamService.getFeedList().
        pipe(takeUntil(this.componentDestroyed))
        .subscribe(res => this.items = res.feed)
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  async openNews(item: IFeedNews) {
    await this._coreStore.setValue(StorageEnum.SELECTED_NEWS, item);
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS, item.id]);
  }
}
