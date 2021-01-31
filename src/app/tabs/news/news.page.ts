import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../tabs.enum';
import {TeamService} from '../../shared/services/team.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IFeedNews} from '../../shared/interfaces/team.interfaces';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    items: IFeedNews[] = [];

    private componentDestroyed: Subject<any> = new Subject();
    private page: number = 0;
    private breakLoadMore: boolean = false;

    constructor(
        private _router: Router,
        private _teamService: TeamService,
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

    async openNews(newsId: number) {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS, newsId]);
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
