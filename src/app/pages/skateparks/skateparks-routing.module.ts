import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkateparksPage } from './skateparks.page';

const routes: Routes = [
  {
    path: '',
    component: SkateparksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkateparksPageRoutingModule {}
