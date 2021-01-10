import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentStandingsPageRoutingModule } from './current-standings-routing.module';

import { CurrentStandingsPage } from './current-standings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentStandingsPageRoutingModule
  ],
  declarations: [CurrentStandingsPage]
})
export class CurrentStandingsPageModule {}
