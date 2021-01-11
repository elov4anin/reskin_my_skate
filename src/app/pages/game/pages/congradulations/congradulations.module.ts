import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongradulationsPageRoutingModule } from './congradulations-routing.module';

import { CongradulationsPage } from './congradulations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CongradulationsPageRoutingModule
  ],
  declarations: [CongradulationsPage]
})
export class CongradulationsPageModule {}
