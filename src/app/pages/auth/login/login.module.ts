import {NgModule} from '@angular/core';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        LoginPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginPage,
    ]
})
export class LoginPageModule {
}
