import {NgModule} from '@angular/core';

import {SpotsPageRoutingModule} from './spots-routing.module';

import {SpotsPage} from './spots.page';
import {SharedModule} from "../../shared/shared.module";
import {SpotPhotosComponent} from "./spot-photos/spot-photos.component";
import {ModalAddSpotComponent} from "./modal-add-spot/modal-add-spot.component";
import {MapBlockComponent} from "./modal-add-spot/map-block/map-block.component";
import {AddPhotosSliderComponent} from "./modal-add-spot/add-photos-slider/add-photos-slider.component";

@NgModule({
    imports: [
        SharedModule,
        SpotsPageRoutingModule
    ],
    declarations: [
        SpotsPage,
        SpotPhotosComponent,
        ModalAddSpotComponent,
        MapBlockComponent,
        AddPhotosSliderComponent,
    ]
})
export class SpotsPageModule {
}
