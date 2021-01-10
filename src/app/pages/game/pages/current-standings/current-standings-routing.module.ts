import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentStandingsPage } from './current-standings.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentStandingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentStandingsPageRoutingModule {}
