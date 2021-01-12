import { Component, OnInit } from '@angular/core';
import {MainLayoutHelper} from "../../shared/layouts/mail-layout/main-layout.helper";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public mainLayoutHelper: MainLayoutHelper) { }

  ngOnInit() {
  }

  openMenu() {
    this.mainLayoutHelper.menuToggleEmitter$.next(false);
  }

  editProfile() {

  }

  logout() {

  }
}
