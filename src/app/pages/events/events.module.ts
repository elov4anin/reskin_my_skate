import {NgModule} from '@angular/core';

import {EventsPageRoutingModule} from './events-routing.module';

import {EventsPage} from './events.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        EventsPageRoutingModule
    ],
    declarations: [EventsPage]
})
export class EventsPageModule {
}
