import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrickPageRoutingModule } from './trick-routing.module';

import { TrickPage } from './trick.page';
import {GamePageModule} from "../game/game.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrickPageRoutingModule,
        GamePageModule
    ],
  declarations: [TrickPage]
})
export class TrickPageModule {}
