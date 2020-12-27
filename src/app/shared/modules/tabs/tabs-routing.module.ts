import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {tabsEnum2RouteMapping} from "./tabs.enum";

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: tabsEnum2RouteMapping.SKATEPARKS,
                loadChildren: () => import('../../../pages/skateparks/skateparks.module').then(m => m.SkateparksPageModule)
            },
            {
                path: tabsEnum2RouteMapping.SPOTS,
                loadChildren: () => import('../../../pages/spots/spots.module').then(m => m.SpotsPageModule)
            },
            {
                path: tabsEnum2RouteMapping.GAME,
                loadChildren: () => import('../../../pages/game/game.module').then(m => m.GamePageModule)
            },
            {
                path: tabsEnum2RouteMapping.STORES,
                loadChildren: () => import('../../../pages/stores/stores.module').then(m => m.StoresPageModule)
            },
            {
                path: tabsEnum2RouteMapping.EVENTS,
                loadChildren: () => import('../../../pages/events/events.module').then(m => m.EventsPageModule)
            },
            // {
            //   path: 'tab2',
            //   loadChildren: () => import('../../../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
            // },
            // {
            //   path: 'tab3',
            //   loadChildren: () => import('../../../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
            // },
            {
                path: '',
                redirectTo: '/tabs/' + tabsEnum2RouteMapping.SKATEPARKS,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/' + tabsEnum2RouteMapping.SKATEPARKS,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
