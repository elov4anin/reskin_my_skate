import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {ModalEditProfileComponent} from "./modals/modal-edit-profile/modal-edit-profile.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        ProfilePageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfilePage,
        ModalEditProfileComponent,
    ]
})
export class ProfilePageModule {
}
