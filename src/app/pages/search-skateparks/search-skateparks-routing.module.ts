import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSkateparksPage } from './search-skateparks.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSkateparksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSkateparksPageRoutingModule {}
