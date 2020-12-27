import { NgModule } from '@angular/core';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
