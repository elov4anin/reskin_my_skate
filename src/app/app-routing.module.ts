import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SKATEPARKS_ROUTES} from "./pages/skateparks/skatepars-routers.enum";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: SKATEPARKS_ROUTES.SEARCH,
    loadChildren: () => import('./pages/search-skateparks/search-skateparks.module').then(m => m.SearchSkateparksPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
