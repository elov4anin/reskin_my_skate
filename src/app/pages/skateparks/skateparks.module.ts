import {NgModule} from '@angular/core';
import {SkateparksPageRoutingModule} from './skateparks-routing.module';

import {SkateparksPage} from './skateparks.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        SkateparksPageRoutingModule
    ],
    declarations: [SkateparksPage]
})
export class SkateparksPageModule {
}
