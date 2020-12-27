import {NgModule} from "@angular/core";
import {MailLayoutComponent} from "./layouts/mail-layout/mail-layout.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "./components/logo/logo.component";

const IONIC_MODULES = [
    IonicModule,
];

const ANGULAR_MODULES = [
    CommonModule,
    FormsModule,
];

const OTHER_MODULES = [];

const COMPONENTS = [
    MailLayoutComponent,
    LogoComponent,
];

const PIPES = [];

const DIRECTIVES = [];

@NgModule({
    imports: [
        ...IONIC_MODULES,
        ...ANGULAR_MODULES,
        ...OTHER_MODULES,
    ],
    exports: [
        ...IONIC_MODULES,
        ...ANGULAR_MODULES,
        ...COMPONENTS,
        ...OTHER_MODULES,
        ...PIPES,
        ...DIRECTIVES
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES,
    ],
    entryComponents: [],
    providers: []
})
export class SharedModule {

}
