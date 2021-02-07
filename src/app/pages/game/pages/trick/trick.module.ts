import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrickPageRoutingModule } from './trick-routing.module';

import { TrickPage } from './trick.page';
import {ModalTrickHowtoComponent} from './modal-trick-howto/modal-trick-howto.component';
import {SafePipe} from '../../safe.pipe';
import {ModalNailedComponent} from '../../modals/modal-nailed/modal-nailed.component';
import {ModalFailedComponent} from '../../modals/modal-failed/modal-failed.component';
import {CurrentStandingsPageModule} from '../current-standings/current-standings.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrickPageRoutingModule,
        CurrentStandingsPageModule,
    ],
  declarations: [
      TrickPage,
      ModalTrickHowtoComponent,
      SafePipe,
      ModalNailedComponent,
      ModalFailedComponent
  ],
})
export class TrickPageModule {}
