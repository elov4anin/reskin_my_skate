import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainLayoutHelper} from '../../shared/layouts/mail-layout/main-layout.helper';
import {ModalController} from '@ionic/angular';
import {ModalEditProfileComponent} from './modals/modal-edit-profile/modal-edit-profile.component';
import {CoreStore} from '../../shared/store/core.store';
import {Router} from '@angular/router';
import {AuthRoutesEnum} from '../../pages/auth/auth-routes.enum';
import {UserService} from '../../shared/services/user.service';
import {IUser} from '../../shared/interfaces/auth.interfaces';
import {selectProfile} from '../../shared/store/selectors';
import {StorageEnum} from '../../shared/enums/Storage.enum';
import {API_URL} from '../../shared/configs/main.config';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

    profile: IUser;

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        public mainLayoutHelper: MainLayoutHelper,
        private _modalController: ModalController,
        private _coreStore: CoreStore,
        private _router: Router,
        private _userService: UserService,
    ) {
    }

    ngOnInit() {
        this._coreStore.select(selectProfile)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(profile => this.profile = profile);
        this.getProfile();
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    getProfile() {
        this._userService.getUserData(this._coreStore.state.profile.id)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async profile => {
                if (profile.response_msg === 'Success') {
                    delete profile.response_msg;
                    const data: IUser = {
                        ...this._coreStore.state.profile,
                        picture: API_URL + profile.picture
                    };
                    await this._coreStore.setValue(StorageEnum.PROFILE, data);
                }
            });

    }

    openMenu() {
        this.mainLayoutHelper.menuToggleEmitter$.next(false);
    }

    async editProfile() {
        const modal = await this._modalController.create({
            component: ModalEditProfileComponent,
            cssClass: 'modal-edit-profile',
            componentProps: {
                profile: this.profile
            }
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            await this._coreStore.setValue(StorageEnum.PROFILE, data);
        }
    }

    async logout() {
        await this._coreStore.clearLogout();
        await this._router.navigate(['/', AuthRoutesEnum.ROOT]);
    }
}
