import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {IEditParamsSpot, ISpot} from '../../../shared/interfaces/skatepark.interfaces';
import {SpotService} from '../../../shared/services/spot.service';
import {RESPONSE_CODES} from '../../../shared/configs/response.constants';
import {SPOT_CONFIRM_MODAL_ID, SPOT_CRUD_MODAL_ID} from '../../../shared/configs/modals.constant';
import {ToastNotificationService} from '../../../shared/helpers/toast-notification.service';
import {CoreStore} from '../../../shared/store/core.store';

@Component({
    selector: 'app-modal-skatepark-confirm',
    templateUrl: './modal-spot-confirm.component.html',
    styleUrls: ['./modal-spot-confirm.component.scss'],
})
export class ModalSpotConfirmComponent implements OnInit, OnDestroy {
    @Input() spot: ISpot | IEditParamsSpot;
    @Input() mode: 'edit' | 'create';

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _modalController: ModalController,
        private _toast: ToastNotificationService,
        private _coreStore: CoreStore,
        private _spotService: SpotService,
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

    async savePark() {
        switch (this.mode) {
            case 'create':
                const createResponse = await this._spotService.addSpot(this.spot);
                await this.showResult(createResponse);
                break;
            case 'edit':
                const editResponse = await this._spotService.editSpot(this.spot as IEditParamsSpot);
                await this.showResult(editResponse);
                break;
        }
    }

    private async showResult(res) {
        if (+res.response_code === +RESPONSE_CODES.SUCCESS) {
            await this._toast.success(`Spot ${this.mode === 'create' ? 'added' : 'edited'}!`);
            this._modalController.dismiss({success: true}, undefined, SPOT_CRUD_MODAL_ID).then();
            this._modalController.dismiss({success: true}, undefined, SPOT_CONFIRM_MODAL_ID).then();
        } else {
            await this._toast.success(res.response);
            this._modalController.dismiss({success: true}, undefined, SPOT_CONFIRM_MODAL_ID).then();
        }
    }
}
