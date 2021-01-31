import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../../shared/services/team.service';
import {Subject} from 'rxjs';
import {IFeedNews} from '../../../../shared/interfaces/team.interfaces';
import {takeUntil} from 'rxjs/operators';
import {CoreStore} from '../../../../shared/store/core.store';
import {StorageEnum} from '../../../../shared/enums/Storage.enum';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../tabs.enum';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-team-news-list',
    templateUrl: './team-news-list.component.html',
    styleUrls: ['./team-news-list.component.scss'],
})
export class TeamNewsListComponent implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    items: IFeedNews[] = [];

    private componentDestroyed: Subject<any> = new Subject();
    private page: number = 0;
    private breakLoadMore: boolean = false;

    constructor(
        private _teamService: TeamService,
        private _coreStore: CoreStore,
        private _router: Router,
    ) {
    }

    ngOnInit() {
        this.getNews();
    }


    getNews() {
        this._teamService.getFeedList(this.page).pipe(takeUntil(this.componentDestroyed))
            .subscribe(res => {
                if (res.feed.length === 0) {
                    this.breakLoadMore = true;
                    this.infiniteScroll.complete().then();
                }
                this.items = this.items.concat(res.feed);
                this.page = this.page + 1;
            });
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async openNews(item: IFeedNews) {
        await this._coreStore.setValue(StorageEnum.SELECTED_NEWS, item);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS, item.id]);
    }

    loadData($event: any) {
        if (this.breakLoadMore) {
            $event.target.disabled = true;
            return;
        } else {
            this.getNews();
        }
    }
}
