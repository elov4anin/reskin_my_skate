import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";
import {RESPONSE_CODES} from "../../../shared/configs/response.constants";
import {AuthService} from "../auth.service";
import {ToastNotificationService} from "../../../shared/helpers/toast-notification.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {VALIDATION_MESSAGES} from "../../../shared/classes/validation-messages";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });
    isReqSending: boolean = false;
    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _toast: ToastNotificationService,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async openLogin() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN])
    }

    reset() {
        this.isReqSending = true;
        this._authService.forgot(this.form.value)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async (res) => {
            this.isReqSending = false;
                if (res.response_code === RESPONSE_CODES.SUCCESS) {
                    await this._toast.success(res.response_msg);
                    await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN]);
                } else {
                    await this._toast.error(res.response_msg);
                }
            }
        )

    }
}
