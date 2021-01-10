import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NailedPageRoutingModule } from './nailed-routing.module';

import { NailedPage } from './nailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NailedPageRoutingModule
  ],
  declarations: [NailedPage]
})
export class NailedPageModule {}
