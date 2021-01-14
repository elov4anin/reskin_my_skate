import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MainLayoutHelper} from "./shared/layouts/mail-layout/main-layout.helper";
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "./tabs/tabs.enum";
import {CoreStore} from "./shared/store/core.store";
import {AuthService} from "./pages/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _mainLayoutHelper: MainLayoutHelper,
    private _router: Router,
    private _coreStore: CoreStore,
    private _authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this._coreStore.ready$;
    });
  }

  showHeaderToggle() {
    this._mainLayoutHelper.menuToggleEmitter$.next(true);
  }

  async openTeam() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.TEAM])
  }

  async openNews() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS])
  }

  async openProfile() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.PROFILE])
  }
}
