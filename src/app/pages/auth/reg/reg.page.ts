import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";
import {AuthService} from "../auth.service";
import {RESPONSE_CODES} from "../../../shared/configs/response.constants";
import {StorageEnum} from "../../../shared/enums/Storage.enum";
import {CoreStore} from "../../../shared/store/core.store";
import {ToastNotificationService} from "../../../shared/helpers/toast-notification.service";

@Component({
    selector: 'app-reg',
    templateUrl: './reg.page.html',
    styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
    form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        pwd: new FormControl('', [Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        dob: new FormControl(''),
    });

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
        ) {
    }

    ngOnInit() {
    }

    register() {
        this._authService.register(this.form.value).subscribe(async (res) => {
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

    async openLogin() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN])
    }
}
