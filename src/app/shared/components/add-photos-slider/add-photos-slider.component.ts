import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ISlideInfo} from '../../../tabs/skateparks/skateparks.interfaces';
import {CameraHelper} from '../../helpers/camera.helper';
import {ActionSheetController, Platform} from '@ionic/angular';
import {HTMLInputEvent} from '../../interfaces/common';
import {PictureSourceType} from '@ionic-native/camera';
import {SpotService} from '../../services/spot.service';
import {CoreStore} from '../../store/core.store';
import {FileUploadResult} from '@ionic-native/file-transfer/ngx';

@Component({
    selector: 'app-add-photos-slider',
    templateUrl: './add-photos-slider.component.html',
    styleUrls: ['./add-photos-slider.component.scss'],
})
export class AddPhotosSliderComponent implements OnInit {
    @Input() sliders: ISlideInfo[] = [];
    @Input() oneImage: boolean = true;

    @Output() images$: EventEmitter<ISlideInfo[]> = new EventEmitter<ISlideInfo[]>();
    @ViewChild('upload') uploadRef: ElementRef;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        width: 60,
    };
    isLoadingPhoto: boolean;

    constructor(
        private _cameraHelper: CameraHelper,
        private _actionSheetController: ActionSheetController,
        private _platform: Platform,
        private _spotService: SpotService,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
    }

    uploadFiles(event: HTMLInputEvent | any) {
        const files: any[] = Array.from(event.target.files);
        if (this.oneImage) {
            this.sliders = [];
        }
        this.sliders.push({imgSrc: files[0]});
        this.images$.emit(this.sliders);
    }

    async triggerUploadImage() {
        if (this._platform.is('android') || this._platform.is('ios')) {
            await this.takeFromCamera(0);
        } else {
            this.uploadRef.nativeElement.click();
        }
    }

    async addFile() {
        if (this.isLoadingPhoto) {
            return;
        }
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

    async takeFromCamera(sourceType: PictureSourceType.CAMERA |  PictureSourceType.PHOTOLIBRARY) {
        this.isLoadingPhoto = true;
        try {
            const imgSrc: string = await this._cameraHelper.takePictureFromCamera(sourceType);
            const fileName = sourceType === PictureSourceType.CAMERA ?
                imgSrc.substring(imgSrc.lastIndexOf('/') + 1) :
                imgSrc.split('?')[0].substring(imgSrc.lastIndexOf('/') + 1);
            if (this.oneImage) {
                this.sliders = [];
                this.sliders.push({imgSrc, fileName});
            } else {
                const res: FileUploadResult = await this._spotService.uploadSpotMedia(this._coreStore.state.profile.id, {imgSrc, fileName});
                if (res.responseCode === 200) {
                    const response = JSON.parse(res.response);
                    this.sliders.push({imgSrc: response.media_url, fileName});
                    this.images$.emit(this.sliders);
                }
            }
            this.isLoadingPhoto = false;
        } catch (e) {
            this.isLoadingPhoto = false;
        }
    }
}
