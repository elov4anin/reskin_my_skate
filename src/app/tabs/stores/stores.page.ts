import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../tabs.enum';
import {IStore} from '../../shared/interfaces/store.interfaces';
import {StoresService} from '../../shared/services/stores.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CoreStore} from '../../shared/store/core.store';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.page.html',
    styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    stores: IStore[] = [];

    private componentDestroyed: Subject<any> = new Subject();
    page: number = 0;
    private breakLoadMore: boolean;

    constructor(
        private _storeService: StoresService,
        private _router: Router,
        private _coreStore: CoreStore
        ) {
    }

    ngOnInit() {
        this.getStores();
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    sort() {

    }

    loadData($event: any) {
        if (this.breakLoadMore) {
            this.infiniteScroll.disabled = true;
            return;
        } else {
            this.infiniteScroll.disabled = false;
            this.getStores();
        }
    }

    async openStore(store: IStore) {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.STORES, store.id]);
    }

    private getStores() {
        this._storeService.getStores({page: this.page})
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(res => {
                if (res.total_stores <= this.stores.length) {

                    this.breakLoadMore = true;
                } else {
                    this.stores = this.stores.concat(res.stores);
                    this.page = this.page + 1;
                }
                this.infiniteScroll.complete().then();
            });
    }
}
