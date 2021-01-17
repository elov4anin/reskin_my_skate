import {HttpClient} from "@angular/common/http";
import {IClubStatusResponse, IGetUserRatingResponse, IServerResponse} from "../interfaces/common";
import {SITE_MAIN} from "../configs/main.config";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private _http: HttpClient) {

    }

    checkUserStatus(userId: number): Observable<IServerResponse> {
        return this._http.post<IServerResponse>(
            SITE_MAIN + 'check-user-status.php',
            {userId},
        );
    }

    checkClubStatus(userId: string): Observable<IClubStatusResponse> {
        return this._http.post<IClubStatusResponse>(
            SITE_MAIN + 'check-club-status.php',
            {userId},
        );
    }


    getUserRating(parkId: string, userId: string): Observable<IGetUserRatingResponse> {
        return this._http.post<IGetUserRatingResponse>(
            SITE_MAIN + 'integration/myskate/myskate-rating-user.php',
            {park: parkId, user: userId},
        );
    }

    getUserReports(parkId: string, userId: string): Observable<{ park_reported: false }> {
        return this._http.post<{ park_reported: false }>(
            SITE_MAIN + 'integration/myskate/myskate-park-user-reports.php',
            {park: parkId, user: userId},
        );
    }
}
