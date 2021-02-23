import {NgModule} from '@angular/core';
import {SkateparksPageRoutingModule} from './skateparks-routing.module';

import {SkateparksPage} from './skateparks.page';
import {SharedModule} from '../../shared/shared.module';
import {SliderBlockComponent} from './components/slider-block/slider-block.component';
import {AddSpotBoardComponent} from './components/add-spot-board/add-spot-board.component';
import {AddSkateparkBoardComponent} from './components/add-skatepark-board/add-skatepark-board.component';
import {ModalAddSkateparkComponent} from './modals/modal-add-skatepark/modal-add-skatepark.component';
import {ModalSkateparkConfirmComponent} from './modals/modal-skatepark-confirm/modal-skatepark-confirm.component';

@NgModule({
    imports: [
        SharedModule,
        SkateparksPageRoutingModule,
    ],
    declarations: [
        SkateparksPage,
        SliderBlockComponent,
        AddSpotBoardComponent,
        AddSkateparkBoardComponent,
        ModalAddSkateparkComponent,
        ModalSkateparkConfirmComponent,
    ]
})
export class SkateparksPageModule {
}
