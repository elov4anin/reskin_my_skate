import {NgModule} from '@angular/core';

import {EventsPageRoutingModule} from './events-routing.module';

import {EventsPage} from './events.page';
import {SharedModule} from "../../shared/shared.module";
import {CalendarDayComponent} from "./calendar-day/calendar-day.component";

@NgModule({
    imports: [
        SharedModule,
        EventsPageRoutingModule
    ],
    declarations: [EventsPage, CalendarDayComponent]
})
export class EventsPageModule {
}
