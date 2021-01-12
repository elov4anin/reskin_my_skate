import {NgModule} from '@angular/core';


import {SharedModule} from "../../shared/shared.module";
import {DifficultyComponent} from "./components/difficulty/difficulty.component";
import {PersonComponent} from "./components/person/person.component";
import {ModalHowtoComponent} from "./modals/modal-howto/modal-howto.component";
import {ModalAddPlayersComponent} from "./modals/modal-add-players/modal-add-players.component";
import {GameTabRoutingModule} from "./game-tab-routing.module";
import {GameTabPage} from "./game-tab.page";

@NgModule({
    imports: [
        SharedModule,
        GameTabRoutingModule
    ],
    declarations: [
        GameTabPage,
        DifficultyComponent,
        PersonComponent,
        ModalHowtoComponent,
        ModalAddPlayersComponent
    ]
})
export class GameTabPageModule {
}
