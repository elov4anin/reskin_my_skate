import {Injectable} from '@angular/core';
import {IServerResponse} from '../interfaces/common';
import {Observable} from 'rxjs';
import {ApiCreatorService} from './api-creator.service';
import {IAddParamsSpot, IEditParamsSpot, IGetSpotsResponse} from '../interfaces/skatepark.interfaces';

@Injectable({
    providedIn: 'root'
})
export class SpotService {
    constructor(private _api: ApiCreatorService) {
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

    getSpotFeatureList() {
        return this._api.baseGetRequest<IServerResponse>(
            'integration/myskate/myskate-skate-spot-feature-list.php'
        );
    }

    editSpot(params: IEditParamsSpot) {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-edit-user-skate-spot.php',
            params
        );
    }

    addSpot(params: IAddParamsSpot) {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-add-user-skate-spot.php',
            params
        );
    }

    deleteSpot(userId: string, spotId: string) {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-delete-user-skate-spot.php',
            {
                user_id: userId,
                spot_id: spotId
            }
        );
    }

    // UPLOAD IMAGE/VIDEO TO RETURN THE MEDIA URL
    uploadSpotMedia(userId: string, media: File): Observable<{success: string}> {
        return this._api.basePostRequest<{success: string}>(
            'integration/myskate/myskate-upload-spot-media.php',
            {
                user_id: userId,
                media
            }
        );
    }

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
