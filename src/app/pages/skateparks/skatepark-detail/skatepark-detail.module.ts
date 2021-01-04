import {NgModule} from '@angular/core';

import {SkateparkDetailPageRoutingModule} from './skatepark-detail-routing.module';

import {SkateparkDetailPage} from './skatepark-detail.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        SkateparkDetailPageRoutingModule
    ],
    declarations: [SkateparkDetailPage]
})
export class SkateparkDetailPageModule {
}
