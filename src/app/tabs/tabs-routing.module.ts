import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "./tabs.enum";

const routes: Routes = [
    {
        path: TABS_MAIN_ROUTE,
        component: TabsPage,
        children: [
            {
                path: tabsEnum2RouteMapping.SKATEPARKS,
                loadChildren: () => import('./skateparks/skateparks.module').then(m => m.SkateparksPageModule)
            },
            {
                path: tabsEnum2RouteMapping.SPOTS,
                loadChildren: () => import('./spots/spots.module').then(m => m.SpotsPageModule)
            },
            {
                path: tabsEnum2RouteMapping.GAME,
                loadChildren: () => import('./game-tab/game-tab.module').then(m => m.GameTabPageModule)
            },
            {
                path: tabsEnum2RouteMapping.STORES,
                loadChildren: () => import('./stores/stores.module').then(m => m.StoresPageModule)
            },
            {
                path: tabsEnum2RouteMapping.EVENTS,
                loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)
            },
            {
                path: tabsEnum2RouteMapping.TEAM,
                loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
            },
            {
                path: tabsEnum2RouteMapping.NEWS,
                loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
            },
            {
                path: '',
                redirectTo: `/${TABS_MAIN_ROUTE}/` + tabsEnum2RouteMapping.SKATEPARKS,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: `/${TABS_MAIN_ROUTE}/` + tabsEnum2RouteMapping.SKATEPARKS,
        pathMatch: 'full'
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
