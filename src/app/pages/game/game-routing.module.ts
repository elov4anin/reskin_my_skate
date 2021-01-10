import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameRoutes} from "./game-routes";

const routes: Routes = [
    {
        path: '',
        children: [
           {
               path: GameRoutes.TRICK,
               loadChildren: () => import('./pages/trick/trick.module').then(m => m.TrickPageModule)
           },
            {
                path: '',
                redirectTo: `/${GameRoutes.ROOT}/` + GameRoutes.TRICK,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: `/${GameRoutes.ROOT}/` +  GameRoutes.TRICK,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
