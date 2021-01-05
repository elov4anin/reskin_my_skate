import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SearchSkateparksPageRoutingModule} from './search-skateparks-routing.module';

import {SearchSkateparksPage} from './search-skateparks.page';
import {GoogleMapComponent} from "./google-map/google-map.component";
import {ModalFilterSkateparksComponent} from "./modal-filter-skateparks/modal-filter-skateparks.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchSkateparksPageRoutingModule
    ],
    declarations: [
        SearchSkateparksPage,
        GoogleMapComponent,
        ModalFilterSkateparksComponent,
    ]
})
export class SearchSkateparksPageModule {}
