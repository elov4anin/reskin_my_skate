import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NailedPage } from './nailed.page';

const routes: Routes = [
  {
    path: '',
    component: NailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NailedPageRoutingModule {}
