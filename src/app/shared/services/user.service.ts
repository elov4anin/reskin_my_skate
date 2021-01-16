import {HttpClient} from "@angular/common/http";
import {IClubStatusResponse, IServerResponse} from "../interfaces/common";
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

    checkClubStatus(userId: number): Observable<IClubStatusResponse> {
        return this._http.post<IClubStatusResponse>(
            SITE_MAIN + 'check-club-status.php',
            {userId},

        );
    }
}
