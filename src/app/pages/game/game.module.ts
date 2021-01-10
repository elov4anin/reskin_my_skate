import {NgModule} from '@angular/core';

import {GamePageRoutingModule} from './game-routing.module';

import {GamePage} from './game.page';
import {SharedModule} from "../../shared/shared.module";
import {DifficultyComponent} from "./difficulty/difficulty.component";
import {PersonComponent} from "./person/person.component";

@NgModule({
    imports: [
        SharedModule,
        GamePageRoutingModule
    ],
    declarations: [
        GamePage,
        DifficultyComponent,
        PersonComponent,
    ]
})
export class GamePageModule {
}
