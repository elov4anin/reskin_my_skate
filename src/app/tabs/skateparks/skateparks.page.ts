import {Component, OnDestroy, OnInit} from '@angular/core';
import {sliders} from './demodata';
import {ISlideInfo} from './skateparks.interfaces';
import {Router} from '@angular/router';
import {SKATEPARKS_ROUTES} from './skatepars-routers.enum';
import {ModalController} from '@ionic/angular';
import {ModalLocationListComponent} from '../../shared/modals/modal-location-list/modal-location-list.component';
import {SkateparksService} from '../../shared/services/skateparks.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CoreStore} from '../../shared/store/core.store';
import {StorageEnum} from '../../shared/store/Storage.enum';
import {ISkatepark} from '../../shared/interfaces/skatepark.interfaces';


@Component({
    selector: 'app-skateparks',
    templateUrl: './skateparks.page.html',
    styleUrls: ['./skateparks.page.scss'],
})
export class SkateparksPage implements OnInit, OnDestroy {

    sliders: ISlideInfo[] = sliders;
    searchValue: string;
    favouriteParks: ISkatepark[] = [];

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _router: Router,
        private _modalController: ModalController,
        private _skateparkService: SkateparksService,
        private _coreStore: CoreStore
    ) {
    }

    ngOnInit() {
        if (!this._coreStore.state.skateparkFeatures) {
            this._skateparkService.getFeatures().pipe(
                takeUntil(this.componentDestroyed),
            ).subscribe(async (res) => {
                await this._coreStore.setValue(StorageEnum.SKATEPARK_FEATURES, res.features);
            });
        }
        this._skateparkService.getFavouriteParks( this._coreStore.state.profile.id, 0)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(res => this.favouriteParks = res.parks);
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async openSearchPage(evt) {
        if (!evt.detail.value) {
            return;
        }
        const modal = await this._modalController.create({
            component: ModalLocationListComponent,
            cssClass: 'modal-location-skateparks',
            componentProps: {
                search: evt.detail.value
            }
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data) {
            this.searchValue = '';
            await this._router.navigate(
                ['/', SKATEPARKS_ROUTES.SEARCH],
                {queryParams: {search: data.selectedLocation}});
        }


    }

}
