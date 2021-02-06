import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../tabs.enum';
import {IStore} from '../../shared/interfaces/store.interfaces';
import {StoresService} from '../../shared/services/stores.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CoreStore} from '../../shared/store/core.store';
import {StorageEnum} from '../../shared/store/Storage.enum';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.page.html',
    styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit, OnDestroy {

    stores: IStore[] = [];

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _storeService: StoresService,
        private _router: Router,
        private _coreStore: CoreStore
        ) {
    }

    ngOnInit() {
        this._storeService.getStores({page: 0})
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(res => this.stores = res.stores);
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    sort() {

    }

    loadData($event: any) {

    }

    async openStore(store: IStore) {
        await this._coreStore.setValue(StorageEnum.SELECTED_STORE, store);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.STORES, store.id]);
    }
}
