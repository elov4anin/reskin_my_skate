import {NgModule} from '@angular/core';
import {SkateparksPageRoutingModule} from './skateparks-routing.module';

import {SkateparksPage} from './skateparks.page';
import {SharedModule} from "../../shared/shared.module";
import {SliderBlockComponent} from "./slider-block/slider-block.component";
import {IonicRatingComponentModule} from "ionic-rating-component";

@NgModule({
    imports: [
        SharedModule,
        SkateparksPageRoutingModule,
        IonicRatingComponentModule
    ],
    declarations: [
        SkateparksPage,
        SliderBlockComponent,
    ]
})
export class SkateparksPageModule {
}
