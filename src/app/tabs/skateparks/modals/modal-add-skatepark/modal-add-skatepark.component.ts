import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalSkateparkConfirmComponent} from '../modal-skatepark-confirm/modal-skatepark-confirm.component';
import {IFeatureSkatepark, ISkatepark} from '../../../../shared/interfaces/skatepark.interfaces';
import {SkateparksService} from '../../../../shared/services/skateparks.service';
import {CoreStore} from '../../../../shared/store/core.store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SKATELITIES, TYPES} from '../../../../pages/search-skateparks/modal-filter-skateparks/dictionaries';
import {SURFACES} from '../../../../pages/search-skateparks/modal-filter-skateparks/surfaces';
import {IAddressWithPostalCode} from '../../../../shared/interfaces/common';
import {ISlideInfo} from '../../skateparks.interfaces';
import {SKATEPARK_CONFIRM_MODAL_ID} from '../../../../shared/configs/modals.constant';
import {getLinksFromSlides, getSlides} from '../../../../shared/helpers/utils';
import {ReplaySubject} from 'rxjs';
import {TRUE_VALUE} from '../../../../shared/configs/main.config';

@Component({
    selector: 'app-modal-add-skatepark',
    templateUrl: './modal-add-skatepark.component.html',
    styleUrls: ['./modal-add-skatepark.component.scss'],
})
export class ModalAddSkateparkComponent implements OnInit {
    @Input() park: ISkatepark;

    form: FormGroup;
    checkboxes: IFeatureSkatepark[] = [];
    initialSliders: ISlideInfo[] = [];
    city$: ReplaySubject<string> = new ReplaySubject<string>(1);
    types: IFeatureSkatepark[] = [...TYPES];
    surfaces: IFeatureSkatepark[] = [...SURFACES];
    skatelities: IFeatureSkatepark[] = [...SKATELITIES];

    private location: IAddressWithPostalCode;
    private images: string[] = [];

    constructor(
        private _modalController: ModalController,
        private _skateparkService: SkateparksService,
        private _coreStore: CoreStore,
        private _fb: FormBuilder,
    ) {
    }

    get isImageChanged() {
        if (!this.park) {
            return false;
        }
        if (!this.park.images) {
            return false;
        }
        return this.images.length === this.park.images.length;
    }

    ngOnInit() {
        this.checkboxes = [...this._coreStore.state.skateparkFeatures];
        if (this.park) {
            console.log('park', this.park);
            this.types = this.types.map(ch => {
                return {
                    ...ch,
                    checked: false
                };
            });
            this.surfaces =  this.surfaces.map(ch => {
                return {
                    ...ch,
                    checked: false
                };
            });
            this.images = [...this.park.images];
            this.initialSliders = getSlides(this.images);
        }
        this.creatForm();
        this.form.get('city').valueChanges.subscribe(city => this.city$.next(city));
    }



    private creatForm() {
        this.form = this._fb.group({
            name: {value: this.park ? this.park.name : '', disabled: this.park},
            city: {value: this.park ? this.park.city : '', disabled: this.park},
            type: {value: this.park ? this.getAndSetTypeValue(this.park, 'types') : '', disabled: this.park},
            material: {value: this.park ? this.getAndSetTypeValue(this.park, 'surfaces') : '', disabled: this.park},
            features: {value: this.park ? this.getAndSetTypeValue(this.park, 'features') : [], disabled: this.park},
            skatelite:  {value: this.park ? this.getAndSetTypeValue(this.park, 'skatelities') : '', disabled: this.park},
        });
    }

    private getAndSetTypeValue(park: ISkatepark, type: 'types' | 'surfaces' | 'skatelities' | 'features') {
        const checkAttr = (attr , dictionary): string => {
            return this.updateDictionary(attr, dictionary, park[attr] === TRUE_VALUE);
        };

        const setValOnce = (dictionary): string => {
            const attrs: string[] = this.getAttrForSetValue(this[dictionary]);
            for (const attr of attrs) {
                const isAttrTrue = checkAttr(attr, dictionary);
                if (isAttrTrue) {
                    return isAttrTrue;
                }
            }
            return '';
        };

        const setValArray = (dictionary): string[] => {
            const attrs: string[] = this.getAttrForSetValue(this[dictionary]);
            const list = [];
            for (const attr of attrs) {
                const isAttrTrue = checkAttr(attr, dictionary);
                if (isAttrTrue) {
                    list.push(isAttrTrue);
                }
            }
            return list;
        };
        switch (type) {
            case 'types': {
                return setValOnce('types');
            }
            case 'surfaces': {
                return setValOnce('surfaces');
            }
            case 'skatelities': {
                return setValOnce('skatelities');
            }
            case 'features': {
                return setValArray('checkboxes');
            }
        }
    }

    private getAttrForSetValue(list: IFeatureSkatepark[]): string[] {
        const res = [];
        for (const f of list) {
            res.push(f.value);
        }
        return  res;
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
        this.images = getLinksFromSlides(slides);
    }

    private updateDictionary(typeAttr, dictionary, checked: boolean = true): string {
        const idx = this[dictionary].findIndex(t => t.value === typeAttr);
        this[dictionary][idx].checked = checked;
        this[dictionary] = [...this[dictionary]];
        return checked ? this[dictionary][idx].value : '';
    }
}
