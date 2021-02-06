import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrickPageRoutingModule } from './trick-routing.module';

import { TrickPage } from './trick.page';
import {ModalTrickHowtoComponent} from "./modal-trick-howto/modal-trick-howto.component";
import {SafePipe} from '../../safe.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TrickPageRoutingModule,
    ],
  declarations: [
      TrickPage,
      ModalTrickHowtoComponent,
      SafePipe,
  ],
})
export class TrickPageModule {}
