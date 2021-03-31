import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {map} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {SkateparksService} from "../../services/skateparks.service";
import {GoogleMapService} from "../../services/google--map.service";
import {ToastNotificationService} from "../../helpers/toast-notification.service";

@Component({
    selector: 'app-modal-location-list',
    templateUrl: './modal-location-list.component.html',
    styleUrls: ['./modal-location-list.component.scss'],
})
export class ModalLocationListComponent implements OnInit, OnDestroy {
    @Input() search: string;

    locations$: Observable<string[]>

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _modalController: ModalController,
        private _skateparksService: SkateparksService,
        private _googleMapService: GoogleMapService,
        private _toast: ToastNotificationService
        ) {
    }

    ngOnInit() {
        this.locations$ = this._skateparksService.searchLocations(this.search)
            .pipe(
                map((res) => res.parks)
            );

    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    async selectLocation(selectedLocation: string) {
        try {
            const coordinates = await this._googleMapService.getCoordinates(selectedLocation);
            await this._modalController.dismiss({selectedLocation, coordinates});
        } catch (e) {
            await this._toast.error(selectedLocation + ' is invalid, please try again');
            await this._modalController.dismiss();
        }
    }
}
