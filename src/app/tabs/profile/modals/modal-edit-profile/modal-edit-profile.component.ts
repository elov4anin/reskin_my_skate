import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, ModalController, Platform} from '@ionic/angular';
import {GENDERS} from '../../../../shared/helpers/genders';
import {IUser} from '../../../../shared/interfaces/auth.interfaces';
import {UserService} from '../../../../shared/services/user.service';
import {MIN_AGE, SITE_MAIN} from '../../../../shared/configs/main.config';
import {VALIDATION_MESSAGES} from '../../../../shared/classes/validation-messages';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {HTMLInputEvent} from '../../../../shared/interfaces/common';
import {CameraHelper} from '../../../../shared/helpers/camera.helper';
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {getPhotoPath} from '../../../../shared/helpers/utils';

@Component({
    selector: 'app-modal-edit-profile',
    templateUrl: './modal-edit-profile.component.html',
    styleUrls: ['./modal-edit-profile.component.scss'],
})
export class ModalEditProfileComponent implements OnInit, OnDestroy {
    @Input() profile: IUser;

    @ViewChild('upload') uploadRef: ElementRef;

    genders = GENDERS.map(g => g);
    form: FormGroup;

    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    maxYear: number;

    constructor(
        private _modalController: ModalController,
        private _fb: FormBuilder,
        private _userService: UserService,
        private _cameraHelper: CameraHelper,
        private _actionSheetController: ActionSheetController,
        private _transfer: FileTransfer,
        private _platform: Platform,
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
            location: userData.location ? userData.location : '',
            gender: userData.gender ? userData.gender : '0',
        });
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    saveProfile() {
        this._userService.editUserData({
            userid: this.profile.id,
            data: {
                ...this.form.value,
                dob: dayjs(this.form.value.dob).format(' DD-MMM-YYYY')
            }
        })
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(profile => {
                if (profile.response_msg === 'Saved') {
                  //  delete profile.response_msg;
                  //  const data: IUser = {
                  //      ...this.profile,
                  //      picture: getPhotoPath(profile.picture)
                  //  };
                    this._modalController.dismiss({success: true}).then();
                }
            });
    }

    uploadFiles(event: HTMLInputEvent | any) {
        const file: any[] = event.target.files[0];
    }

    async triggerUploadImage() {
        if (this._platform.is('android') || this._platform.is('ios')) {
            await this.takeFromCamera(0);
        } else {
            this.uploadRef.nativeElement.click();
        }
    }

    async addFile() {
        const actionSheet = await this._actionSheetController.create({
            header: 'Add photo',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Take Photo',
                icon: 'camera-outline',
                handler: () => {
                    this.takeFromCamera(1);
                }
            }, {
                text: 'Photo from Library',
                icon: 'image-outline',
                handler: () => {
                    this.triggerUploadImage();
                }
            }, {
                text: 'Close',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async takeFromCamera(sourceType: 1 | 0) {
        try {
            const filePath: string = await this._cameraHelper.takePictureFromCamera(sourceType);
            const fileName = sourceType === 1 ?
                filePath.substring(filePath.lastIndexOf('/') + 1) :
                filePath.split('?')[0].substring(filePath.lastIndexOf('/') + 1);

            const options: FileUploadOptions = {
                fileName,
                fileKey: 'image',
                chunkedMode: false,
                params: {
                    userid: this.profile.id,
                    value2: 'param'
                }
            };
            const url: string = SITE_MAIN + 'profile-picture-upload.php';
            const fileTransfer: FileTransferObject = this._transfer.create();
            const res = await fileTransfer.upload(filePath, url, options);
            if (res.responseCode === 200) {
                this.profile.picture = getPhotoPath(res.response);
            }
        } catch (e) {
        }
    }
}
