import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentStandingsPageRoutingModule } from './current-standings-routing.module';

import { CurrentStandingsPage } from './current-standings.page';
import {SkateTextComponent} from '../../components/skate-text/skate-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentStandingsPageRoutingModule
  ],
  exports: [
    SkateTextComponent
  ],
  declarations: [CurrentStandingsPage, SkateTextComponent]
})
export class CurrentStandingsPageModule {}
