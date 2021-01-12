import {NgModule} from '@angular/core';

import {NewsItemPageRoutingModule} from './news-item-routing.module';

import {NewsItemPage} from './news-item.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        NewsItemPageRoutingModule
    ],
    declarations: [NewsItemPage]
})
export class NewsItemPageModule {
}
