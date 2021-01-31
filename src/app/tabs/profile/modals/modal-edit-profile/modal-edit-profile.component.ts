import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {GENDERS} from '../../../../shared/helpers/genders';
import {IUser} from '../../../../shared/interfaces/auth.interfaces';
import {UserService} from '../../../../shared/services/user.service';
import {API_URL, MIN_AGE} from '../../../../shared/configs/main.config';
import {VALIDATION_MESSAGES} from '../../../../shared/classes/validation-messages';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-modal-edit-profile',
    templateUrl: './modal-edit-profile.component.html',
    styleUrls: ['./modal-edit-profile.component.scss'],
})
export class ModalEditProfileComponent implements OnInit, OnDestroy {
    @Input() profile: IUser;

    genders = GENDERS.map(g => g);
    form: FormGroup;

    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    maxYear: number;

    constructor(
        private _modalController: ModalController,
        private _fb: FormBuilder,
        private _userService: UserService,
    ) {
    }

    ngOnInit() {
        this.maxYear = dayjs().year() - MIN_AGE;
        this.createForm(this.profile);
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    createForm(userData: IUser) {
        this.genders = GENDERS.map(g => {
            return {
                ...g,
                checked: userData.gender === g.value
            };
        });
        this.form = this._fb.group({
            firstname: [userData.firstname ? userData.firstname : '', Validators.required],
            lastname: [userData.lastname ? userData.lastname : '', Validators.required],
            dob: userData.dob ? userData.dob : '',
            location: '',
            gender: userData.gender ? userData.gender : '0',
        });
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    saveProfile() {
        this._userService.editUserData({
            userid: this.profile.id,
            data: this.form.value
        })
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(profile => {
                if (profile.response_msg === 'Success') {
                    delete profile.response_msg;
                    const data: IUser = {
                        ...this.profile,
                        picture: API_URL + profile.picture
                    };
                    this._modalController.dismiss(data).then();
                }
            });
    }
}
