import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SkateparksService} from '../../../../shared/services/skateparks.service';
import {UserService} from '../../../../shared/services/user.service';
import {CoreStore} from '../../../../shared/store/core.store';
import {forkJoin} from 'rxjs';
import {ToastNotificationService} from '../../../../shared/helpers/toast-notification.service';

@Component({
    selector: 'app-modal-report-closure',
    templateUrl: './modal-report-closure.component.html',
    styleUrls: ['./modal-report-closure.component.scss'],
})
export class ModalReportClosureComponent implements OnInit {
    @Input() skateparkId: string;
    form: FormGroup = new FormGroup({
        dateClosure: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });

    constructor(
        private _modalController: ModalController,
        private _skateparkService: SkateparksService,
        private _userService: UserService,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
    ) {
    }

    ngOnInit() {
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    sendReport() {
        forkJoin([
            this._skateparkService.reportParkClosure(this.skateparkId, this._coreStore.state.profile.id),
            this._userService.userReported(this.skateparkId, this._coreStore.state.profile.id)
        ]).subscribe(async res => {
            console.log(res);
            if (res[0].success && res[1].park_reported) {
                await this.closeModal();
                await this._toast.success(res[0].response_msg);
                return;
            }
            await this._toast.error(res[0].response_msg);
        });

    }
}
