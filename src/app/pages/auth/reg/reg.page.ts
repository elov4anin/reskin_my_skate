import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";
import {AuthService} from "../auth.service";
import {RESPONSE_CODES} from "../../../shared/configs/response.constants";
import {StorageEnum} from "../../../shared/enums/Storage.enum";
import {CoreStore} from "../../../shared/store/core.store";
import {ToastNotificationService} from "../../../shared/helpers/toast-notification.service";
import {VALIDATION_MESSAGES} from "../../../shared/classes/validation-messages";
import * as dayjs from "dayjs";
import {DATE_FORMAT, MIN_AGE} from "../../../shared/configs/main.config";

@Component({
    selector: 'app-reg',
    templateUrl: './reg.page.html',
    styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
    form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        pwd: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')]),
        dob: new FormControl('', [Validators.required]),
    });

    readonly validationMessages = VALIDATION_MESSAGES;
    maxYear: number;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
        ) {
    }

    ngOnInit() {
        this.maxYear = dayjs().year() - MIN_AGE;
    }

    register() {
        if ( this.form.value.dob) {
            const dob = dayjs( this.form.value.dob).format(DATE_FORMAT);
            this.form.value.dob = dob;
        }
        delete this.form.value.confirmPassword
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

    openDataPicker() {
    }
}
