import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CongradulationsPage } from './congradulations.page';

const routes: Routes = [
  {
    path: '',
    component: CongradulationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongradulationsPageRoutingModule {}
