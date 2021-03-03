import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {getEnumAsArray} from '../../shared/helpers/utils';
import {SegmentsEnum, segmentsEnum2LabelMapping} from './segments.enum';
import {LoadingController, ModalController} from '@ionic/angular';
import {ModalFilterSkateparksComponent} from './modal-filter-skateparks/modal-filter-skateparks.component';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../tabs/tabs.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {SkateparksService} from '../../shared/services/skateparks.service';
import {of, Subject} from 'rxjs';
import {ModalLocationListComponent} from '../../shared/modals/modal-location-list/modal-location-list.component';
import {ISkatepark, ISkateparkFilterParams} from '../../shared/interfaces/skatepark.interfaces';
import {ICoordinates} from '../../shared/interfaces/common';
import {GoogleMapService} from '../../shared/services/google--map.service';
import {CoreStore} from '../../shared/store/core.store';
import {StorageEnum} from '../../shared/store/Storage.enum';
import {FilterSkateparksHelper} from './modal-filter-skateparks/filter-skateparks.helper';

@Component({
    selector: 'app-search-skateparks',
    templateUrl: './search-skateparks.page.html',
    styleUrls: ['./search-skateparks.page.scss'],
})
export class SearchSkateparksPage implements OnInit, OnDestroy {
    readonly segmentsEnum = SegmentsEnum;
    readonly segments = getEnumAsArray(SegmentsEnum);
    readonly segmentsEnum2LabelMapping = segmentsEnum2LabelMapping;

    private componentDestroyed: Subject<any> = new Subject();

    selectedSegment: SegmentsEnum = SegmentsEnum.LIST;
    foundSkateparks: ISkatepark[] = [];
    isReloading: boolean = false;
    currentFilter: ISkateparkFilterParams;
    isFilterActive: boolean = false;
    isInit: boolean = false;


    constructor(
        private _location: Location,
        private _modalController: ModalController,
        private _router: Router,
        private _route: ActivatedRoute,
        private _skateparksService: SkateparksService,
        private _googleMapService: GoogleMapService,
        private _coreStore: CoreStore,
        public _loadingController: LoadingController,
        public _filterHelper: FilterSkateparksHelper,
    ) {
    }

    ngOnInit() {
        this.isInit = true;
        this.currentFilter = Object.assign({}, this._filterHelper.defaultFilterState);
        this._route.queryParams.pipe(
            takeUntil(this.componentDestroyed),
        ).subscribe(async (params: any) => {
            if (params && params.search) {
                if (this.foundSkateparks.length === 0) {
                    const coordinates = await this._googleMapService.getCoordinates(params.search);
                    this.setFilter(params.search, coordinates);
                    this._filterHelper.filterChange$.next(this.currentFilter);
                }
            }
        });
        this._filterHelper.filterChange$.pipe(
            takeUntil(this.componentDestroyed),
            switchMap((filter: ISkateparkFilterParams) => {
                if (filter) {
                    this.currentFilter = filter;
                    this.isFilterActive = this._filterHelper.checkFilterActive(filter);
                    this.presentLoading().then();
                    return this._skateparksService.getParksByLocation(filter, this._coreStore.state.profile.id);
                }
                return of(null);
            })
        ).subscribe(async (res: any) => {
            this.foundSkateparks = res.parks;
            this.isInit = false;
            const isLoading = await this._loadingController.getTop();
            if (isLoading) {
                await this._loadingController.dismiss();
            }
        });


    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async search(evt: any) {
        if (this.isInit) {
            return ;
        }
        const isLoading = await this._loadingController.getTop();
        if (isLoading) {
            return ;
        }
        if (!evt.target.value) {
            return false;
        }
        if (evt.target.value.length < 2) {
            return false;
        }
        const modal = await this._modalController.create({
            component: ModalLocationListComponent,
            cssClass: 'modal-location-skateparks',
            componentProps: {
                search: evt.target.value
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data) {
            if (this.selectedSegment === SegmentsEnum.MAP) {
                this.selectedSegment = SegmentsEnum.LIST;
            }
            this.setFilter(data.selectedLocation, data.coordinates);
            this._filterHelper.filterChange$.next(this.currentFilter);
        }
    }

    back() {
        this._location.back();
    }

    async openFilter() {
        const modal = await this._modalController.create({
            component: ModalFilterSkateparksComponent,
            cssClass: 'modal-filter-skateparks',
            componentProps: {
                filterState: this.currentFilter
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data && data.filter) {
            this._filterHelper.filterChange$.next(data.filter);
        }
    }

    segmentChanged() {
    }

    async openSkatepark(skatepark: ISkatepark) {
        await this._coreStore.setValue(StorageEnum.SELECTED_SKATEPARK, skatepark);
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, skatepark.id]);
    }

    private async presentLoading() {
        const loading = await this._loadingController.create({
            cssClass: 'loading',
            message: 'Please wait...',
            duration: 2000
        });
        await loading.present();
    }

    private setFilter(location: string, coordinates: ICoordinates) {
        this.currentFilter = {
            ...this.currentFilter,
            location,
            coordinates
        };
    }
}
