import {NgModule} from '@angular/core';

import {SearchSkateparksPageRoutingModule} from './search-skateparks-routing.module';

import {SearchSkateparksPage} from './search-skateparks.page';
import {GoogleMapComponent} from './google-map/google-map.component';
import {ModalFilterSkateparksComponent} from './modal-filter-skateparks/modal-filter-skateparks.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SearchSkateparksPageRoutingModule
    ],
    declarations: [
        SearchSkateparksPage,
        GoogleMapComponent,
        ModalFilterSkateparksComponent,
    ]
})
export class SearchSkateparksPageModule {}
