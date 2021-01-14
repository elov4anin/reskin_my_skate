import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
    ],
    declarations: [
    ]
})
export class AuthModule {}
