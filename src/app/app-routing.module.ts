import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SKATEPARKS_ROUTES} from "./tabs/skateparks/skatepars-routers.enum";
import {GameRoutes} from "./pages/game/game-routes";
import {AuthRoutesEnum} from "./pages/auth/auth-routes.enum";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: GameRoutes.ROOT,
        loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
    },
    {
        path: SKATEPARKS_ROUTES.SEARCH,
        loadChildren: () => import('./pages/search-skateparks/search-skateparks.module').then(m => m.SearchSkateparksPageModule)
    },
    {
        path: AuthRoutesEnum.ROOT,
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
