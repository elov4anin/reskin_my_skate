import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkateparkDetailPage } from './skatepark-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SkateparkDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkateparkDetailPageRoutingModule {}
