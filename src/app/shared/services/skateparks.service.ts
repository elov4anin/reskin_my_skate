import {HttpClient} from "@angular/common/http";
import {SITE_MAIN} from "../configs/main.config";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {
    IGetFeaturesResponse, IGetParksByLocation,
    ISearchLocationsResponse,
    ISkateparkFilterParams, IUserLastCheckInResponse
} from "../interfaces/skatepark.interfaces";

@Injectable({
    providedIn: "root"
})
export class SkateparksService {

    constructor(private _http: HttpClient) {

    }

    searchLocations(exp: string): Observable<ISearchLocationsResponse> {
        return this._http.post<ISearchLocationsResponse>(
            SITE_MAIN + 'integration/myskate/myskate-parks-search-location.php',
            {filter: exp},

        );
    }

    getParksByLocation(filter: ISkateparkFilterParams): Observable<IGetParksByLocation> {
        filter.features = [];
        filter.material = "";
        filter.page = 0;
        filter.type = "";
        return this._http.post<IGetParksByLocation>(
            SITE_MAIN + 'integration/myskate-parks-radius-search.php',
            filter
        );
    }

    userLastCheckIn(parkId: string, userId: string): Observable<IUserLastCheckInResponse> {
        return this._http.post<IUserLastCheckInResponse>(
            SITE_MAIN + 'integration/myskate/myskate-park-user-last-check-in.php',
            {
                park: parkId,
                user: userId
            }
        );
    }


    getFeatures(): Observable<IGetFeaturesResponse> {
        return this._http.post<IGetFeaturesResponse>(
            SITE_MAIN + 'integration/myskate/myskate-features.php',
            {},
        );
    }
}
