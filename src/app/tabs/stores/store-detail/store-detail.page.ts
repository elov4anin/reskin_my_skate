import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {IStore, Store} from '../../../shared/interfaces/store.interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {StoresService} from '../../../shared/services/stores.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit, OnDestroy {
  store: IStore = new Store();

  private componentDestroyed: Subject<any> = new Subject();

  constructor(
      private _location: Location,
      private _iab: InAppBrowser,
      private _storeService: StoresService,
      private _route: ActivatedRoute,
      ) { }

  ngOnInit() {
    this._route.params
        .pipe(
            takeUntil(this.componentDestroyed),
            switchMap((params) => {
              if (params && params.id) {
                return this._storeService.getDetailStoreById(params.id);
              }
              return of(null);
            })
        ).subscribe(res => this.setStore(res.stores));
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  back() {
    this._location.back();
  }

  private setStore(stores: IStore[]): void {
    if (stores.length > 0) {
      this.store = stores[0];
    }
  }

  openBrowser() {
    this._iab.create(this.store.website);
  }
}
