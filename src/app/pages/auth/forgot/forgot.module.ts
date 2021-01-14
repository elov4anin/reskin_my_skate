import {NgModule} from '@angular/core';

import {ForgotPageRoutingModule} from './forgot-routing.module';

import {ForgotPage} from './forgot.page';
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        ForgotPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ForgotPage]
})
export class ForgotPageModule {
}
