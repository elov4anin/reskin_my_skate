import {Injectable} from '@angular/core';
import {IServerResponse} from '../interfaces/common';
import {Observable} from 'rxjs';
import {ApiCreatorService} from './api-creator.service';
import {IEditParamsSpot, IGetSpotFeaturesResponse, IGetSpotsResponse, ISpot} from '../interfaces/skatepark.interfaces';
import {FileTransfer, FileTransferObject, FileUploadOptions, FileUploadResult} from '@ionic-native/file-transfer/ngx';
import {SITE_MAIN} from '../configs/main.config';

@Injectable({
    providedIn: 'root'
})
export class SpotService {
    constructor(
        private _api: ApiCreatorService,
        private _transfer: FileTransfer,
        ) {
    }

    getSpots(userId: string, page: number, limit: number = 10): Observable<IGetSpotsResponse> {
        return this._api.basePostRequest<IGetSpotsResponse>(
            'integration/myskate/myskate-user-skate-spots.php',
            {
                user_id: userId,
                page,
                limit
            },
        );
    }

    getSpotFeatureList(): Promise<IGetSpotFeaturesResponse> {
        return this._api.baseGetRequest<IGetSpotFeaturesResponse>(
            'integration/myskate/myskate-skate-spot-feature-list.php'
        ).toPromise();
    }

    editSpot(params: IEditParamsSpot) {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-edit-user-skate-spot.php',
            params
        ).toPromise();
    }

    addSpot(params: ISpot): Promise<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-add-user-skate-spot.php',
            params
        ).toPromise();
    }

    deleteSpot(userId: string, spotId: string): Promise<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-delete-skate-spot.php',
            {
                user_id: userId,
                spot_id: spotId
            }
        ).toPromise();
    }

    // UPLOAD IMAGE/VIDEO TO RETURN THE MEDIA URL
    uploadSpotMedia(userId: string, media: any): Promise<FileUploadResult> {
        const options: FileUploadOptions = {
            fileKey: 'media',
            fileName: media.fileName,
            chunkedMode: false,
            // @ts-ignore
            params: {
                user_id: userId,
            }
        };

        const url: string = SITE_MAIN + 'integration/myskate/myskate-upload-spot-media.php';
        const fileTransfer: FileTransferObject = this._transfer.create();
        return fileTransfer.upload(media.imgSrc, url, options);
    }

    // ADD IMAGE URL TO AN EXISTING SKATE SPOT
    saveSpotImage(userId: string, spotId: string, imageUrl): Observable<{success: string}> {
        return this._api.basePostRequest<{success: string}>(
            'integration/myskate/myskate-save-spot-image.php',
            {
                user_id: userId,
                spot_id: spotId,
                image_url: imageUrl
            }
        );
    }
}
