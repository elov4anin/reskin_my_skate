import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalSkateparkConfirmComponent} from '../modal-skatepark-confirm/modal-skatepark-confirm.component';
import {IFeatureSkatepark} from '../../../../shared/interfaces/skatepark.interfaces';
import {SkateparksService} from '../../../../shared/services/skateparks.service';
import {CoreStore} from '../../../../shared/store/core.store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SKATELITIES, TYPES} from '../../../../pages/search-skateparks/modal-filter-skateparks/dictionaries';
import {SURFACES} from '../../../../pages/search-skateparks/modal-filter-skateparks/surfaces';
import {IAddressWithPostalCode} from '../../../../shared/interfaces/common';
import {ISlideInfo} from '../../skateparks.interfaces';
import {SKATEPARK_CONFIRM_MODAL_ID} from '../../../../shared/configs/modals.constant';

@Component({
    selector: 'app-modal-add-skatepark',
    templateUrl: './modal-add-skatepark.component.html',
    styleUrls: ['./modal-add-skatepark.component.scss'],
})
export class ModalAddSkateparkComponent implements OnInit {
    form: FormGroup;
    checkboxes: IFeatureSkatepark[] = [];
    readonly types: IFeatureSkatepark[] = TYPES;
    readonly skatelities: IFeatureSkatepark[] = SKATELITIES;
    readonly surfaces: IFeatureSkatepark[] = SURFACES;
    private location: IAddressWithPostalCode;
    private images: any[] = [];

    constructor(
        private _modalController: ModalController,
        private _skateparkService: SkateparksService,
        private _coreStore: CoreStore,
        private _fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.checkboxes = this._coreStore.state.skateparkFeatures;
        this.creatForm();
    }

    private creatForm() {
        this.form = this._fb.group({
            name: '',
            city: '',
            type: '',
            material: '',
            features: [[]],
            skatelite: false,
        });
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    async confirmSave() {

        const modal = await this._modalController.create({
            component: ModalSkateparkConfirmComponent,
            cssClass: 'modal-confirm',
            id: SKATEPARK_CONFIRM_MODAL_ID,
            componentProps: {
                candidate: {
                    ...this.form.value,
                    ...this.location,
                    image: this.images
                }
            }
        });
        await modal.present();
    }

    getAddressFromMap($event: IAddressWithPostalCode) {
        this.location = $event;
    }

    changeImages(slides: ISlideInfo[]) {
        this.images = slides;
    }
}
