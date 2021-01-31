import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {CoreStore} from '../../../shared/store/core.store';
import {EventImpl, IEvent} from '../../../shared/interfaces/team.interfaces';
import {selectEvent} from '../../../shared/store/selectors';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {StorageEnum} from '../../../shared/enums/Storage.enum';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.page.html',
    styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit, OnDestroy {
    event: IEvent = new EventImpl();

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _location: Location,
        private _modalController: ModalController,
        private _coreStore: CoreStore,
        private _iab: InAppBrowser
    ) {
    }

    ngOnInit() {
        this._coreStore.getValue(StorageEnum.SELECTED_EVENT).then(event => this.setEvent(event));
        this._coreStore.select(selectEvent)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(event => this.setEvent(event));
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    back() {
        this._location.back();
    }


    private setEvent(event: IEvent): void {
        if (event) {
            this.event = event;
        }
    }

    openBrowser() {
        this._iab.create(this.event.website);
    }
}
