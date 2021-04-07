import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameRoutes} from './game-routes';
import {LoadTrickControllerComponent} from './components/load-trick-controller/load-trick-controller.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${GameRoutes.ROOT}/` + GameRoutes.CONTROLLER,
        pathMatch: 'full'
    },
    {
        path: GameRoutes.CONTROLLER,
        component: LoadTrickControllerComponent
    },
    {
        path: GameRoutes.TRICK + '/:id',
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
    },
    {
        path: GameRoutes.CONGRATULATIONS,
        loadChildren: () => import('./pages/congradulations/congradulations.module').then(m => m.CongradulationsPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
