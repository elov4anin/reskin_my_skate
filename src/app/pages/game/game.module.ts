import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {GameRoutingModule} from "./game-routing.module";
import {ModalLeaderboardComponent} from "./modals/modal-leaderboard/modal-leaderboard.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GameRoutingModule
  ],
  declarations: [
    ModalLeaderboardComponent
  ]
})
export class GameModule {}
