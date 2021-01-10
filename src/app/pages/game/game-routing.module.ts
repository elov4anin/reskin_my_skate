import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameRoutes} from "./game-routes";

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${GameRoutes.ROOT}/` + GameRoutes.TRICK,
        pathMatch: 'full'
    },
    {
        path: GameRoutes.TRICK,
        loadChildren: () => import('./pages/trick/trick.module').then(m => m.TrickPageModule)
    },
    {
        path: GameRoutes.NAILED,
        loadChildren: () => import('./pages/nailed/nailed.module').then(m => m.NailedPageModule)
    },
    {
        path: GameRoutes.FAILED,
        loadChildren: () => import('./pages/failed/failed.module').then(m => m.FailedPageModule)
    },
    {
        path: GameRoutes.CURRENT,
        loadChildren: () => import('./pages/current-standings/current-standings.module').then(m => m.CurrentStandingsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
