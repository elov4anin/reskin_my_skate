import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IAddSkateparkParams} from '../../../../shared/interfaces/skatepark.interfaces';
import {SkateparksService} from '../../../../shared/services/skateparks.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ToastNotificationService} from '../../../../shared/helpers/toast-notification.service';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {SITE_MAIN} from '../../../../shared/configs/main.config';
import {fromPromise} from 'rxjs/internal-compatibility';
import {CoreStore} from '../../../../shared/store/core.store';
import {SKATEPARK_CONFIRM_MODAL_ID, SKATEPARK_CRUD_MODAL_ID} from '../../../../shared/configs/modals.constant';

@Component({
    selector: 'app-modal-skatepark-confirm',
    templateUrl: './modal-skatepark-confirm.component.html',
    styleUrls: ['./modal-skatepark-confirm.component.scss'],
})
export class ModalSkateparkConfirmComponent implements OnInit, OnDestroy {
    @Input() candidate: IAddSkateparkParams;

    private componentDestroyed: Subject<any> = new Subject();
    isRequestSending: boolean;

    constructor(
        private _modalController: ModalController,
        private _skateParkService: SkateparksService,
        private _toast: ToastNotificationService,
        private _transfer: FileTransfer,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    savePark() {
        this.isRequestSending = true;
        this.toggleMethod(this.candidate.image.length > 0)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async (res) => {
                if (!!res.responseCode ) {
                    if (res.responseCode === 200) {
                        this._modalController.dismiss(undefined, undefined, SKATEPARK_CRUD_MODAL_ID).then();
                        this._modalController.dismiss({success: true}, undefined, SKATEPARK_CONFIRM_MODAL_ID).then();
                        await this._toast.success('Skate park added!');
                    } else {
                        await this._toast.success(res.response);
                        this._modalController.dismiss({success: true}, undefined, SKATEPARK_CONFIRM_MODAL_ID).then();
                    }
                    this.isRequestSending = false;
                    return;
                }

                if (res.success) {
                    this._modalController.dismiss(undefined, undefined, SKATEPARK_CRUD_MODAL_ID).then();
                    this._modalController.dismiss({success: true}, undefined, SKATEPARK_CONFIRM_MODAL_ID).then();
                    await this._toast.success('Skate park added!');
                    this.isRequestSending = false;
                } else {
                    await this._toast.success(res.response_msg);
                    this._modalController.dismiss({success: true}, undefined, SKATEPARK_CONFIRM_MODAL_ID).then();
                    this.isRequestSending = false;
                }
            });
    }

    toggleMethod(isImage): Observable<any> {
        if (isImage) {
            const image = this.candidate.image[0];

            const options: FileUploadOptions = {
                ...this.candidate,
                fileKey: 'image',
                fileName: image.fileName,
                chunkedMode: false,
                // @ts-ignore
                params: {
                    user: this._coreStore.state.profile.id,
                    name: this.candidate.name,
                    city: this.candidate.city,
                    material: this.candidate.material,
                    website: this.candidate.website,
                    type: this.candidate.type,
                    skatelite: this.candidate.skatelite,
                    features: this.candidate.features,
                }
            };

            const url: string = SITE_MAIN + 'integration/myskate/myskate-park-save-image.php';
            const fileTransfer: FileTransferObject = this._transfer.create();
            return fromPromise(fileTransfer.upload(image.imgSrc, url, options));

        }
        return this._skateParkService.addSkatepark(this.candidate);
    }
}
