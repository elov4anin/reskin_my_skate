import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {getEnumAsArray} from "../../shared/helpers/utils";
import {SegmentsEnum, segmentsEnum2LabelMapping} from "./segments.enum";
import {ModalController} from "@ionic/angular";
import {ModalFilterSkateparksComponent} from "./modal-filter-skateparks/modal-filter-skateparks.component";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../tabs/tabs.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {SkateparksService} from "../../shared/services/skateparks.service";
import {of, ReplaySubject, Subject} from "rxjs";
import {ModalLocationListComponent} from "../../shared/modals/modal-location-list/modal-location-list.component";
import {ISkatepark} from "../../shared/interfaces/skatepark.interfaces";
import {ICoordinates} from "../../shared/interfaces/common";
import {GoogleMapService} from "../../shared/services/google--map.service";

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

    coordinates$: ReplaySubject<ICoordinates> = new ReplaySubject<ICoordinates>(1);

    selectedSegment: SegmentsEnum = SegmentsEnum.LIST;
    currentSearchExp: string;
    foundSkateparks: ISkatepark[] = [];


    constructor(
        private _location: Location,
        private _modalController: ModalController,
        private _router: Router,
        private _route: ActivatedRoute,
        private _skateparksService: SkateparksService,
        private _googleMapService: GoogleMapService
    ) {
    }

    ngOnInit() {
        this._route.queryParams.pipe(
            takeUntil(this.componentDestroyed),
        ).subscribe(async (params: any) => {
            if (params && params.search) {
                this.currentSearchExp = params.search;
                const coordinates = await this._googleMapService.getCoordinates(this.currentSearchExp);
                this.coordinates$.next(coordinates);
            }
        })
        this.coordinates$.pipe(
            takeUntil(this.componentDestroyed),
            switchMap((coordinates) => {
                if (coordinates) {
                    return this._skateparksService.getParksByLocation({location: this.currentSearchExp, coordinates})
                }
                return of(null)
            })
        ).subscribe((res: any) => this.foundSkateparks = res.parks);


    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async search(evt: any) {
        if(!evt.target.value) {
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
            this.currentSearchExp = data.selectedLocation;
            this.coordinates$.next(data.coordinates);
        }


    }

    back() {
        this._location.back();
    }

    async openFilter() {
        const modal = await this._modalController.create({
            component: ModalFilterSkateparksComponent,
            cssClass: 'modal-filter-skateparks'
        });
        return await modal.present();
    }

    segmentChanged() {
    }

    async openSkatepark(skateparkId: string) {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, skateparkId])
    }
}
