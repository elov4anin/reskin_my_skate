import {NgModule} from '@angular/core';
import {MailLayoutComponent} from './layouts/mail-layout/mail-layout.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoComponent} from './components/logo/logo.component';
import {IonicRatingComponentModule} from 'ionic-rating-component';
import {CheckboxListComponent} from './components/checkbox-list/checkbox-list.component';
import {CalendarDayComponent} from './components/calendar-day/calendar-day.component';
import {MapBlockComponent} from './components/map-block/map-block.component';
import {AddPhotosSliderComponent} from './components/add-photos-slider/add-photos-slider.component';
import {ModalLocationListComponent} from './modals/modal-location-list/modal-location-list.component';
import {CustomToggleControlComponent} from './components/custom-toggle-control/custom-toggle-control.component';
import {EventComponent} from './components/event/event.component';
import {OverflowDotsPipe} from './pipes/overflow-dots.pipe';
import {ModalAddSpotComponent} from '../tabs/spots/modal-add-spot/modal-add-spot.component';
import {ModalLocationOnMapComponent} from './modals/modal-location-on-map/modal-location-on-map.component';

const IONIC_MODULES = [
    IonicModule,
];

const ANGULAR_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
];

const OTHER_MODULES = [
    IonicRatingComponentModule
];

const COMPONENTS = [
    MailLayoutComponent,
    LogoComponent,
    CheckboxListComponent,
    CalendarDayComponent,
    MapBlockComponent,
    AddPhotosSliderComponent,
    CustomToggleControlComponent,
    EventComponent,
];

const MODALS = [
    ModalLocationOnMapComponent,
    ModalAddSpotComponent,
    ModalLocationListComponent,
];

const PIPES = [
    OverflowDotsPipe
];

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
        ...MODALS,
        ...OTHER_MODULES,
        ...PIPES,
        ...DIRECTIVES
    ],
    declarations: [
        ...COMPONENTS,
        ...MODALS,
        ...PIPES,
        ...DIRECTIVES,
    ],
    entryComponents: [],
    providers: []
})
export class SharedModule {

}
