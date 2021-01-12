import {NgModule} from '@angular/core';

import {NewsPageRoutingModule} from './news-routing.module';

import {NewsPage} from './news.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        NewsPageRoutingModule
    ],
    declarations: [NewsPage]
})
export class NewsPageModule {
}
