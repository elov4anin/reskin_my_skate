import {NgModule} from '@angular/core';

import {EventDetailPageRoutingModule} from './event-detail-routing.module';

import {EventDetailPage} from './event-detail.page';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        EventDetailPageRoutingModule
    ],
    declarations: [EventDetailPage]
})
export class EventDetailPageModule {
}
