import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CoreStore} from '../../../shared/store/core.store';
import {IFeatureSkatepark, ISkateparkFilterParams} from '../../../shared/interfaces/skatepark.interfaces';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TYPES} from './dictionaries';
import {SKATELITE, SURFACES} from './surfaces';
import {FilterSkateparksHelper} from './filter-skateparks.helper';
import {SkateparksService} from '../../../shared/services/skateparks.service';
import {Subject} from 'rxjs';


@Component({
    selector: 'app-modal-filter-skateparks',
    templateUrl: './modal-filter-skateparks.component.html',
    styleUrls: ['./modal-filter-skateparks.component.scss'],
})
export class ModalFilterSkateparksComponent implements OnInit, OnDestroy {
    @Input() filterState: ISkateparkFilterParams;

    types: IFeatureSkatepark[] = TYPES;
    surfaces: IFeatureSkatepark[] = SURFACES;
    skatelite: IFeatureSkatepark[] = SKATELITE;

    checkboxesList: IFeatureSkatepark[] = [];
    form: FormGroup;

    private isShow: boolean;
    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _modalController: ModalController,
        private _coreStore: CoreStore,
        private _fb: FormBuilder,
        private _filterHelper: FilterSkateparksHelper,
        private _cdr: ChangeDetectorRef,
        private _skateparkService: SkateparksService,
    ) {
    }

    ngOnInit() {
        this.isShow = true;
        this.checkboxesList = this._coreStore.state.skateparkFeatures.map(v => v);
        if (this.filterState) {
            this.setStateControls(this.filterState);
            this.creatForm(this.filterState);
        }
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    private creatForm(filterState: ISkateparkFilterParams) {
        this.form = this._fb.group({
            type: filterState.type ? filterState.type : '',
            material: filterState.material ? filterState.material : '',
            features: [filterState.features.length > 0 ? filterState.features : []],
            skatelite: filterState.features.includes('skatelite') ? 'skatelite' : ''
        });
    }

    async closeModal() {
        this.isShow = false;
        await this._modalController.dismiss();
    }

    async applyFilter() {

        const currentFormValue: ISkateparkFilterParams = this.form.value;
        currentFormValue.features = currentFormValue.features.filter(v => v !== 'skatelite');
        if (currentFormValue.skatelite) {
            currentFormValue.features.push(currentFormValue.skatelite);
        }
        delete currentFormValue.skatelite;
        this.isShow = false;
        await this._modalController.dismiss({
            filter: {
                ...currentFormValue,
                location: this.filterState.location,
                coordinates: this.filterState.coordinates
            }
        });

    }

    resetFilter() {
        this.form.reset();
        this.checkboxesList = this.setUnChecked(this.checkboxesList);
        this.types = this.setUnChecked(this.types);
        this.surfaces = this.setUnChecked(this.surfaces);
        this.skatelite[0].checked = false;
    }

    private setUnChecked(list: IFeatureSkatepark[]): IFeatureSkatepark[] {
        return list.map(ch => {
            return {
                ...ch,
                checked: false
            };
        });
    }

    private setStateControls(filterState: ISkateparkFilterParams) {
        if (filterState.features.length > 0) {
            filterState.features.forEach(f => {
                const idx = this.checkboxesList.findIndex(btn => btn.value === f);
                if (idx !== -1) {
                    this.checkboxesList[idx].checked = true;
                }
            });
            if (filterState.features.includes('"skatelite"')) {
                this.skatelite[0].checked = true;
            }
            this.skatelite[0].checked = false;
        } else {
            this.checkboxesList = this.setUnChecked(this.checkboxesList);
        }

        this.types = this.setUnChecked(this.types);
        this.surfaces = this.setUnChecked(this.surfaces);

        if (filterState.material) {
            const idx = this.surfaces.findIndex(s => s.value === filterState.material);
            if (idx !== -1) {
                this.surfaces[idx].checked = true;
            }
        }

        if (filterState.type) {
            const idx = this.types.findIndex(s => s.value === filterState.type);
            if (idx !== -1) {
                this.types[idx].checked = true;
            }
        }
    }
}
