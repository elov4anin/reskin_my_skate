import { Component, OnInit } from '@angular/core';
import {MainLayoutHelper} from "../../shared/layouts/mail-layout/main-layout.helper";
import {ModalController} from "@ionic/angular";
import {ModalEditProfileComponent} from "./modals/modal-edit-profile/modal-edit-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
      public mainLayoutHelper: MainLayoutHelper,
      private _modalController: ModalController,
      ) { }

  ngOnInit() {
  }

  openMenu() {
    this.mainLayoutHelper.menuToggleEmitter$.next(false);
  }

  async editProfile() {
    const modal = await this._modalController.create({
      component: ModalEditProfileComponent,
      cssClass: 'modal-edit-profile'
    });
    return await modal.present();
  }

  logout() {

  }
}
