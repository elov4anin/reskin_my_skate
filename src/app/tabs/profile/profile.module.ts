import {NgModule} from '@angular/core';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {ModalEditProfileComponent} from './modals/modal-edit-profile/modal-edit-profile.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        ProfilePageRoutingModule,
    ],
    declarations: [
        ProfilePage,
        ModalEditProfileComponent,
    ]
})
export class ProfilePageModule {
}
