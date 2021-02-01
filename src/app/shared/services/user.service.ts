import {IClubStatusResponse, IGetUserRatingResponse, IServerResponse} from '../interfaces/common';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ApiCreatorService} from './api-creator.service';
import {IEditUserDataParams, IGetUserDataResponse} from '../interfaces/auth.interfaces';
import {IFindPlayerByEmailResponse} from '../interfaces/game';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _api: ApiCreatorService) {

    }

    checkUserStatus(userId: number): Observable<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'check-user-status.php',
            {userId},
        );
    }

    checkClubStatus(userId: string): Observable<IClubStatusResponse> {
        return this._api.basePostRequest<IClubStatusResponse>(
            'check-club-status.php',
            {userId},
        );
    }


    getUserRating(parkId: string, userId: string): Observable<IGetUserRatingResponse> {
        return this._api.basePostRequest<IGetUserRatingResponse>(
            'integration/myskate/myskate-rating-user.php',
            {park: parkId, user: userId},
        );
    }

    userReported(parkId: string, userId: string): Observable<{ park_reported: false }> {
        return this._api.basePostRequest<{ park_reported: false }>(
            'integration/myskate/myskate-park-user-reports.php',
            {park: parkId, user: userId},
        );
    }

    getUserData(userid: string): Observable<IGetUserDataResponse> {
        return this._api.basePostRequest<IGetUserDataResponse>(
            'view-about-me.php',
            {userid},
        );
    }

    editUserData(params: IEditUserDataParams): Observable<IGetUserDataResponse>  {
        return this._api.basePostRequest<IGetUserDataResponse>(
            'view-about-me.php',
            params,
        );
    }

    /**
     * unused, but example
     * @param params
     */
    uploadPhoto(params) {
        return this._api.basePostRequest<IGetUserDataResponse>(
            'profile-picture-upload.php',
            params,
        );
    }

    findPlayerByEmail(search: string): Observable<IFindPlayerByEmailResponse>  {
        return this._api.basePostRequest<IFindPlayerByEmailResponse>(
            'integration/myskate/myskate-players-match.php',
            { search },
        );
    }
}
