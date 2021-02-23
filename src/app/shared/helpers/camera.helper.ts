import {Injectable} from '@angular/core';

import {Camera, CameraResultType, CameraSource} from '@capacitor/core';
import {excludedCameraErrors} from './excluded-camera-errors';
import {Platform} from '@ionic/angular';
import {Camera as CameraCordova, PictureSourceType} from '@ionic-native/camera/ngx';
import {ToastNotificationService} from './toast-notification.service';
import {QUALITY_CAMERA} from '../configs/main.config';

@Injectable({
    providedIn: 'root'
})
export class CameraHelper {
    constructor(
        private _toast: ToastNotificationService,
        private _platform: Platform,
        private _camera: CameraCordova,
    ) {
    }

    async takePictureFromCamera(sourceType = PictureSourceType.CAMERA, destinationTypeBase64: boolean = false): Promise<string> {
        try {
            if (this._platform.is('android') || this._platform.is('ios')) {
                const image = await this._camera.getPicture({
                    quality: QUALITY_CAMERA,
                    destinationType: destinationTypeBase64 ? this._camera.DestinationType.DATA_URL : this._camera.DestinationType.FILE_URI,
                    encodingType: this._camera.EncodingType.JPEG,
                    mediaType: this._camera.MediaType.PICTURE,
                    correctOrientation: true,
                    sourceType
                });
                if (destinationTypeBase64) {
                    return 'data:image/jpeg;base64,' + image;
                }
                return image;
                // return 'data:image/jpeg;base64,' + image;
            } else {
                const image = await Camera.getPhoto({
                    quality: QUALITY_CAMERA,
                    allowEditing: false,
                    resultType: CameraResultType.Uri,
                    source: CameraSource.Prompt,
                    correctOrientation: true
                });
                console.log(image);
                return image.webPath;
            }
        } catch (e) {
            if (!excludedCameraErrors.includes(e.toLowerCase())) {
                await this._toast.info('Ошибка камеры');
            }
        }
    }
}
