import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";
import {AuthService} from "../auth.service";
import {RESPONSE_CODES} from "../../../shared/configs/response.constants";
import {ToastNotificationService} from "../../../shared/helpers/toast-notification.service";
import {CoreStore} from "../../../shared/store/core.store";
import {StorageEnum} from "../../../shared/enums/Storage.enum";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _toast: ToastNotificationService,
        private _coreStore: CoreStore
    ) {
    }

    ngOnInit() {
    }

    login() {
        this._authService.login(this.form.value).subscribe(async (res) => {
                if (res.response_code === RESPONSE_CODES.SUCCESS) {
                    await this._coreStore.setValue(StorageEnum.LOGGEDIN, true)
                    await this._coreStore.setValue(StorageEnum.PROFILE, res.user)
                    await this._router.navigate(['/']);
                } else {
                    await this._toast.error(res.response_msg);
                }
            }
        )

    }

    async openRegistration() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.REG]);
    }

    async openForgot($event) {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.FORGOT_PASS]);
    }
}
