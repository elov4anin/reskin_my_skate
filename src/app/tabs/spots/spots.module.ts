import {NgModule} from '@angular/core';

import {SpotsPageRoutingModule} from './spots-routing.module';

import {SpotsPage} from './spots.page';
import {SharedModule} from '../../shared/shared.module';
import {SpotPhotosComponent} from './spot-photos/spot-photos.component';

@NgModule({
    imports: [
        SharedModule,
        SpotsPageRoutingModule
    ],
    declarations: [
        SpotsPage,
        SpotPhotosComponent,
    ]
})
export class SpotsPageModule {
}
