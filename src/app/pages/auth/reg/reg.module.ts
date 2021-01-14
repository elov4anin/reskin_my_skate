import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { RegPageRoutingModule } from './reg-routing.module';

import { RegPage } from './reg.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        RegPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [RegPage]
})
export class RegPageModule {}
