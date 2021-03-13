import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthRoutesEnum} from '../auth-routes.enum';
import {AuthService} from '../auth.service';
import {RESPONSE_CODES} from '../../../shared/configs/response.constants';
import {StorageEnum} from '../../../shared/store/Storage.enum';
import {CoreStore} from '../../../shared/store/core.store';
import {ToastNotificationService} from '../../../shared/helpers/toast-notification.service';
import {VALIDATION_MESSAGES} from '../../../shared/classes/validation-messages';
import * as dayjs from 'dayjs';
import {DATE_FORMAT, MIN_AGE} from '../../../shared/configs/main.config';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {matchValuesValidator} from '../../../shared/classes/validators';
import {GENDERS} from '../../../shared/helpers/genders';
import {capitalizeFirstLetter} from '../../../shared/helpers/utils';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.page.html',
    styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        pwd: new FormControl('', [
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
        ]),
        confirmPassword: new FormControl({value: '', disabled: true}, [
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
            matchValuesValidator('pwd')
        ]),
        dob: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
    });

    genders = GENDERS.map(g => g);

    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    maxYear: number;
    isReqSending: boolean = false;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
    ) {
    }

    ngOnInit() {
        this.maxYear = dayjs().year() - MIN_AGE;
        this.form.get('pwd').valueChanges
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => {
            if (this.form.get('pwd').valid && this.form.get('confirmPassword').disabled) {
                this.form.get('confirmPassword').enable();
            }
            if (this.form.get('pwd').invalid && this.form.get('confirmPassword').enabled) {
                this.form.get('confirmPassword').disable();
            }
        });
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    register() {
        this.isReqSending = true;
        if (this.form.value.dob) {
            this.form.value.dob = dayjs(this.form.value.dob).format(DATE_FORMAT);
        }
        delete this.form.value.confirmPassword;
        this._authService.register(this.form.value)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async (res) => {
                    this.isReqSending = false;
                    if (res.response_code === RESPONSE_CODES.SUCCESS) {
                        await this._coreStore.setValue(StorageEnum.LOGGEDIN, true);
                        await this._coreStore.setValue(StorageEnum.PROFILE, res.user);
                        await this._router.navigate(['/']);
                    } else {
                        await this._toast.error(res.response_msg);
                    }
                }
            );
    }

    async openLogin() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN]);
    }

    openDataPicker() {
    }

    capitalize(event, fieldName) {
        this.form.get(fieldName).setValue(capitalizeFirstLetter(event.target.value));
    }
}
