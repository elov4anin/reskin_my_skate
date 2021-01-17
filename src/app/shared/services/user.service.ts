import {IClubStatusResponse, IGetUserRatingResponse, IServerResponse} from "../interfaces/common";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiCreatorService} from "./api-creator.service";


@Injectable({
    providedIn: "root"
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

    getUserReports(parkId: string, userId: string): Observable<{ park_reported: false }> {
        return this._api.basePostRequest<{ park_reported: false }>(
            'integration/myskate/myskate-park-user-reports.php',
            {park: parkId, user: userId},
        );
    }
}