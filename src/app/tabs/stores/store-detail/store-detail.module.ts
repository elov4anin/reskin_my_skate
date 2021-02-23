import {NgModule} from '@angular/core';

import {StoreDetailPageRoutingModule} from './store-detail-routing.module';

import {StoreDetailPage} from './store-detail.page';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        StoreDetailPageRoutingModule
    ],
    declarations: [StoreDetailPage]
})
export class StoreDetailPageModule {
}
