import {Component, OnDestroy} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {MainLayoutHelper} from './shared/layouts/mail-layout/main-layout.helper';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from './tabs/tabs.enum';
import {CoreStore} from './shared/store/core.store';
import {AuthService} from './pages/auth/auth.service';
import {IUser} from './shared/interfaces/auth.interfaces';
import {selectLoggedIn, selectProfile} from './shared/store/selectors';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PushHelper} from './shared/helpers/push.helper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy{
  profile: IUser;

  private componentDestroyed: Subject<any> = new Subject();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _mainLayoutHelper: MainLayoutHelper,
    private _router: Router,
    private _coreStore: CoreStore,
    private _authService: AuthService,
    private _pushHelper: PushHelper,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this._coreStore.ready$.then(() => {
        this._coreStore.select(selectProfile)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(profile => {
              if (profile) {
               this.profile = profile;
              }
            });
        this._coreStore.select(selectLoggedIn)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(auth => {
              if (auth) {
                this._pushHelper.init();
              }
            });
      });
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  showHeaderToggle() {
    this._mainLayoutHelper.menuToggleEmitter$.next(true);
  }

  async openTeam() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.TEAM]);
  }

  async openNews() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS]);
  }

  async openProfile() {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.PROFILE]);
  }
}
