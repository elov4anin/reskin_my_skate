import {NgModule} from '@angular/core';

import {SkateparkDetailPageRoutingModule} from './skatepark-detail-routing.module';

import {SkateparkDetailPage} from './skatepark-detail.page';
import {SharedModule} from '../../../shared/shared.module';
import {SliderPhotosComponent} from './slider-photos/slider-photos.component';
import {SliderFeaturesComponent} from './slider-features/slider-features.component';
import {ClosetStoreComponent} from './closet-store/closet-store.component';
import {ModalReportClosureComponent} from './modal-report-closure/modal-report-closure.component';
import {ModalRatingsComponent} from './modal-ratings/modal-ratings.component';

@NgModule({
    imports: [
        SharedModule,
        SkateparkDetailPageRoutingModule,
    ],
    declarations: [
        SkateparkDetailPage,
        SliderPhotosComponent,
        SliderFeaturesComponent,
        ClosetStoreComponent,
        ModalReportClosureComponent,
        ModalRatingsComponent,
    ]
})
export class SkateparkDetailPageModule {
}
