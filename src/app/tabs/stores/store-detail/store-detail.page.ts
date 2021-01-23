import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {CoreStore} from "../../../shared/store/core.store";
import {selectStore} from "../../../shared/store/selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IStore, Store} from "../../../shared/interfaces/store.interfaces";
import {StorageEnum} from "../../../shared/enums/Storage.enum";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
      private _coreStore: CoreStore,
      private _iab: InAppBrowser
      ) { }

  ngOnInit() {
    this._coreStore.getValue(StorageEnum.SELECTED_STORE).then(store => this.setStore(store));
    this._coreStore.select(selectStore)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(store => this.setStore(store))
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  back() {
    this._location.back();
  }

  private setStore(store: IStore): void {
    if (store) {
      this.store = store;
    }
  }

  openBrowser() {
    this._iab.create(this.store.website)
  }
}
