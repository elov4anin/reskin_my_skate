import {NgModule} from '@angular/core';

import {GameRoutingModule} from './game-routing.module';
import {ModalLeaderboardComponent} from './modals/modal-leaderboard/modal-leaderboard.component';
import {LoadTrickControllerComponent} from './components/load-trick-controller/load-trick-controller.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        GameRoutingModule
    ],
    declarations: [
        ModalLeaderboardComponent,
        LoadTrickControllerComponent,
    ]
})
export class GameModule {
}
