import {NgModule} from '@angular/core';

import {TeamPageRoutingModule} from './team-routing.module';

import {TeamPage} from './team.page';
import {SharedModule} from "../../shared/shared.module";
import {TeamEventListComponent} from "./components/team-event-list/team-event-list.component";
import {TeamNewsListComponent} from "./components/team-news-list/team-news-list.component";

@NgModule({
    imports: [
        SharedModule,
        TeamPageRoutingModule
    ],
    declarations: [
        TeamPage,
        TeamNewsListComponent,
        TeamEventListComponent,
    ]
})
export class TeamPageModule {
}
