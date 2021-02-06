import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {GameRoutingModule} from './game-routing.module';
import {ModalLeaderboardComponent} from './modals/modal-leaderboard/modal-leaderboard.component';
import {LoadTrickControllerComponent} from './components/load-trick-controller/load-trick-controller.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GameRoutingModule
  ],
  declarations: [
    ModalLeaderboardComponent,
    LoadTrickControllerComponent,
  ]
})
export class GameModule {}
