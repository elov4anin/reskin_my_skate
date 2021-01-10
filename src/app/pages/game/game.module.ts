import {NgModule} from '@angular/core';

import {GamePageRoutingModule} from './game-routing.module';

import {GamePage} from './game.page';
import {SharedModule} from "../../shared/shared.module";
import {DifficultyComponent} from "./components/difficulty/difficulty.component";
import {PersonComponent} from "./components/person/person.component";
import {ModalHowtoComponent} from "./modals/modal-howto/modal-howto.component";
import {ModalAddPlayersComponent} from "./modals/modal-add-players/modal-add-players.component";

@NgModule({
    imports: [
        SharedModule,
        GamePageRoutingModule
    ],
    declarations: [
        GamePage,
        DifficultyComponent,
        PersonComponent,
        ModalHowtoComponent,
        ModalAddPlayersComponent
    ]
})
export class GamePageModule {
}
