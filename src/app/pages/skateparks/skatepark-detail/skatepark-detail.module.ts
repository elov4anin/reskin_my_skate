import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkateparkDetailPageRoutingModule } from './skatepark-detail-routing.module';

import { SkateparkDetailPage } from './skatepark-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkateparkDetailPageRoutingModule
  ],
  declarations: [SkateparkDetailPage]
})
export class SkateparkDetailPageModule {}
