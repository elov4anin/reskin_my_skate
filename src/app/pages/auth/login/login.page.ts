import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthRoutesEnum} from '../auth-routes.enum';
import {AuthService} from '../auth.service';
import {RESPONSE_CODES} from '../../../shared/configs/response.constants';
import {ToastNotificationService} from '../../../shared/helpers/toast-notification.service';
import {CoreStore} from '../../../shared/store/core.store';
import {StorageEnum} from '../../../shared/store/Storage.enum';
import {VALIDATION_MESSAGES} from '../../../shared/classes/validation-messages';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {getPhotoPath} from '../../../shared/helpers/utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
        ]),
    });

    isReqSending: boolean = false;
    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _toast: ToastNotificationService,
        private _coreStore: CoreStore
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    login() {
        this.isReqSending = true;
        this._authService.login(this.form.value)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async (res) => {
                this.isReqSending = false;
                if (res.response_code === RESPONSE_CODES.SUCCESS) {
                    const user = {
                        ...res.user,
                        picture: getPhotoPath(res.user.picture)
                    };
                    await this._coreStore.setValue(StorageEnum.PROFILE, user);
                    await this._coreStore.setValue(StorageEnum.LOGGEDIN, true);
                    await this._router.navigate(['/']);
                } else {
                    await this._toast.error(res.response_msg);
                }
            }
        );

    }

    async openRegistration() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.REG]);
    }

    async openForgot($event) {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.FORGOT_PASS]);
    }
}
