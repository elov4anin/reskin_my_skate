import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SkateparksPage} from './skateparks.page';
import {SKATEPARKS_ROUTES} from "./skatepars-routers.enum";


const routes: Routes = [
  {
    path: '',
    component: SkateparksPage
  },
  {
    path: SKATEPARKS_ROUTES.SKATEPARK + '/:id',
    loadChildren: () => import('./skatepark-detail/skatepark-detail.module').then( m => m.SkateparkDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkateparksPageRoutingModule {}
