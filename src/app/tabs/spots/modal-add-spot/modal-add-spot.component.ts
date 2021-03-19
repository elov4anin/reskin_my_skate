import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IEditParamsSpot, IFeatureSkatepark, ISpot} from '../../../shared/interfaces/skatepark.interfaces';
import {IAddressWithPostalCode} from '../../../shared/interfaces/common';
import {ISlideInfo} from '../../skateparks/skateparks.interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {CoreStore} from '../../../shared/store/core.store';
import {ToastNotificationService} from '../../../shared/helpers/toast-notification.service';
import {ModalSpotConfirmComponent} from '../modal-spot-confirm/modal-spot-confirm.component';
import {SPOT_CONFIRM_MODAL_ID} from '../../../shared/configs/modals.constant';
import {SpotService} from '../../../shared/services/spot.service';

@Component({
    selector: 'app-modal-add-spot',
    templateUrl: './modal-add-spot.component.html',
    styleUrls: ['./modal-add-spot.component.scss'],
})
export class ModalAddSpotComponent implements OnInit {
    @Input() currentSpot: ISpot;
    checkboxes: IFeatureSkatepark[] = [];
    form: FormGroup;

    city$: ReplaySubject<string> = new ReplaySubject<string>(1);

    private location: IAddressWithPostalCode;
    images: any[] = [];
    initialSliders: ISlideInfo[] = [];

    constructor(
        private _modalController: ModalController,
        private _spotService: SpotService,
        private _fb: FormBuilder,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
    ) {
    }


    private prepareFeatures(features: string[]): IFeatureSkatepark[] {
        return features.map(f => {
            return {
                name: f,
                checked: this.form.get('features').value.includes(f),
                value: f
            };
        });
    }


    async ngOnInit() {
        this.creatForm(this.currentSpot);
        await this.getSpotFeatures();
        if (this.currentSpot) {
            this.city$.next(this.currentSpot.city);
            this.images = this.currentSpot.images;
            this.initialSliders = this.getSlides(this.images);
        }
        this.form.get('city').valueChanges.subscribe(city => this.city$.next(city));
    }

    getAddressFromMap($event: IAddressWithPostalCode) {
        this.location = $event;
    }

    changeImages(slides: ISlideInfo[]) {
        this.images = slides.map(s => s.imgSrc);
    }

    private creatForm(spot: ISpot) {
        this.form = this._fb.group({
            name: spot ? spot.name : '',
            city: spot ? spot.city : '',
            features: [spot ? spot.features : []],
        });
    }

    private async getSpotFeatures() {
        const res = await this._spotService.getSpotFeatureList();
        this.checkboxes = this.prepareFeatures(res.features);
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    async addSpot() {
        const newSpot: ISpot = {
            ...this.form.value,
            ...this.location,
            images: this.images,
            user_id: this._coreStore.state.profile.id,
        };
        // @ts-ignore
        delete newSpot.address;
        await this.saveSpot(newSpot);
    }

    private async saveSpot(newSpot: ISpot) {
        if (this.currentSpot && this.currentSpot.id) {
            await this.confirmSave({
                ...newSpot,
                id: this.currentSpot.id,
                spot_id: this.currentSpot.id,
            }, 'edit');
        } else {
            await this.confirmSave(newSpot, 'create');
        }
    }

    async confirmSave(spot: ISpot | IEditParamsSpot, mode: 'edit' | 'create') {

        const modal = await this._modalController.create({
            component: ModalSpotConfirmComponent,
            cssClass: 'modal-confirm',
            id: SPOT_CONFIRM_MODAL_ID,
            componentProps: {
                spot,
                mode,
            }
        });
        await modal.present();
    }

    getSlides(images: string[]): ISlideInfo[] {
        return  images.map(imgSrc => {
            return {
                imgSrc
            };
        });
    }
}
