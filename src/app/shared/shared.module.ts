import {NgModule} from "@angular/core";
import {MailLayoutComponent} from "./layouts/mail-layout/mail-layout.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "./components/logo/logo.component";
import {IonicRatingComponentModule} from "ionic-rating-component";
import {CheckboxListComponent} from "./components/checkbox-list/checkbox-list.component";
import {CalendarDayComponent} from "./components/calendar-day/calendar-day.component";

const IONIC_MODULES = [
    IonicModule,
];

const ANGULAR_MODULES = [
    CommonModule,
    FormsModule,
];

const OTHER_MODULES = [
    IonicRatingComponentModule
];

const COMPONENTS = [
    MailLayoutComponent,
    LogoComponent,
    CheckboxListComponent,
    CalendarDayComponent,
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
