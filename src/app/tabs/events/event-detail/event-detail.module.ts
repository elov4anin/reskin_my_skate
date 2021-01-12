import {NgModule} from '@angular/core';

import {EventDetailPageRoutingModule} from './event-detail-routing.module';

import {EventDetailPage} from './event-detail.page';
import {SharedModule} from "../../../shared/shared.module";
import {ModalRatingsComponent} from "./modal-ratings/modal-ratings.component";

@NgModule({
    imports: [
        SharedModule,
        EventDetailPageRoutingModule
    ],
    declarations: [EventDetailPage, ModalRatingsComponent]
})
export class EventDetailPageModule {
}
