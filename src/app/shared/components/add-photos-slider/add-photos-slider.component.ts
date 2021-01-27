import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {sliders} from 'src/app/tabs/skateparks/demodata';
import {ISlideInfo} from "../../../tabs/skateparks/skateparks.interfaces";
import {CameraHelper} from "../../helpers/camera.helper";
import {ActionSheetController} from "@ionic/angular";
import {uuid4} from "@capacitor/core/dist/esm/util";
import {HTMLInputEvent} from "../../interfaces/common";

@Component({
    selector: 'app-add-photos-slider',
    templateUrl: './add-photos-slider.component.html',
    styleUrls: ['./add-photos-slider.component.scss'],
})
export class AddPhotosSliderComponent implements OnInit {
    @Input() sliders: ISlideInfo[] = [];

    @Output() images$: EventEmitter<ISlideInfo[]>=new EventEmitter<ISlideInfo[]>()
    @ViewChild('upload') uploadRef: ElementRef;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 16,
        width: 60,
    };

    constructor(
        private _cameraHelper: CameraHelper,
        private _actionSheetController: ActionSheetController,
    ) {
    }

    ngOnInit() {
    }

    uploadFiles(event: HTMLInputEvent | any) {
        const files: any[] = Array.from(event.target.files);
        this.sliders = []
        this.sliders.push({imgSrc: files[0]});
        this.images$.emit(this.sliders)
    }

    triggerUploadImage() {
        this.uploadRef.nativeElement.click();
    }

    async addFile() {
        const actionSheet = await this._actionSheetController.create({
            header: 'Add photo',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Take Photo',
                icon: 'camera-outline',
                handler: () => {
                    this.takeFromCamera()
                }
            }, {
                text: 'Photo from Library',
                icon: 'image-outline',
                handler: () => {
                    this.triggerUploadImage()
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

    async takeFromCamera() {
        try {
            const image64: string = await this._cameraHelper.takePictureFromCamera();
            console.log(image64);
            this.sliders = []
            this.sliders.push({imgSrc: image64});
            this.images$.emit(this.sliders)

           //fetch(waterMarkedPhoto)
           //    .then(res => res.blob())
           //    .then(blob => {
           //        this.candidateFilesToUpload.push({
           //            file: blob,
           //            _uuid: uuid4(),
           //            filename: getNameCameraPicture()
           //        });
           //        this.isFileLoading = false;
           //    });
        } catch (e) {
           // this.isFileLoading = false;
        }
    }
}
