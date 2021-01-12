import {NgModule} from '@angular/core';
import {SkateparksPageRoutingModule} from './skateparks-routing.module';

import {SkateparksPage} from './skateparks.page';
import {SharedModule} from "../../shared/shared.module";
import {SliderBlockComponent} from "./components/slider-block/slider-block.component";
import {AddSpotBoardComponent} from "./components/add-spot-board/add-spot-board.component";
import {AddSkateparkBoardComponent} from "./components/add-skatepark-board/add-skatepark-board.component";

@NgModule({
    imports: [
        SharedModule,
        SkateparksPageRoutingModule,
    ],
    declarations: [
        SkateparksPage,
        SliderBlockComponent,
        AddSpotBoardComponent,
        AddSkateparkBoardComponent,
    ]
})
export class SkateparksPageModule {
}
