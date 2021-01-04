import {NgModule} from '@angular/core';

import {SkateparkDetailPageRoutingModule} from './skatepark-detail-routing.module';

import {SkateparkDetailPage} from './skatepark-detail.page';
import {SharedModule} from "../../../shared/shared.module";
import {SliderPhotosComponent} from "./slider-photos/slider-photos.component";
import {SliderFeaturesComponent} from "./slider-features/slider-features.component";
import {ClosetStoreComponent} from "./closet-store/closet-store.component";

@NgModule({
    imports: [
        SharedModule,
        SkateparkDetailPageRoutingModule
    ],
    declarations: [
        SkateparkDetailPage,
        SliderPhotosComponent,
        SliderFeaturesComponent,
        ClosetStoreComponent,
    ]
})
export class SkateparkDetailPageModule {
}
