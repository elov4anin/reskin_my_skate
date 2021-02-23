import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IFeatureSkatepark, ISpot} from '../../../shared/interfaces/skatepark.interfaces';
import {SpotService} from '../../../shared/services/spot.service';
import {IAddressWithPostalCode} from '../../../shared/interfaces/common';
import {ISlideInfo} from '../../skateparks/skateparks.interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {CoreStore} from '../../../shared/store/core.store';

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
    private images: any[] = [];

    constructor(
        private _modalController: ModalController,
        private _spotService: SpotService,
        private _fb: FormBuilder,
        private _coreStore: CoreStore,
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
        }
        this.form.get('city').valueChanges.subscribe(city =>  this.city$.next(city));
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
            image: this.images,
            user_id: this._coreStore.state.profile.id,
        };
        // @ts-ignore
        delete newSpot.address;
        if (this.currentSpot && this.currentSpot.id) {
            await this._spotService.editSpot({
                ...newSpot,
                id: this.currentSpot.id,
                spot_id: this.currentSpot.id,
            });
        } else {
            await this._spotService.addSpot(newSpot);
        }


        await this._modalController.dismiss({success: true});
    }
}
