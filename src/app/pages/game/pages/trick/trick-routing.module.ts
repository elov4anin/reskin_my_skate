import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrickPage } from './trick.page';

const routes: Routes = [
  {
    path: '',
    component: TrickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrickPageRoutingModule {}
