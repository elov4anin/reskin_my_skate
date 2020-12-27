import {NgModule} from '@angular/core';

import {SpotsPageRoutingModule} from './spots-routing.module';

import {SpotsPage} from './spots.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        SpotsPageRoutingModule
    ],
    declarations: [SpotsPage]
})
export class SpotsPageModule {
}
