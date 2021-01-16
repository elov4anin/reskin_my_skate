import {HttpClient} from "@angular/common/http";
import {SITE_MAIN} from "../configs/main.config";
import {Observable, of} from "rxjs";
import {Injectable, NgZone} from "@angular/core";
import {
    IGetFeaturesResponse, IGetParksByLocation,
    ISearchLocationsResponse,
    ISkateparkFilterParams
} from "../interfaces/skatepark.interfaces";
import {ICoordinates} from "../interfaces/common";

declare var google;

@Injectable({
    providedIn: "root"
})
export class SkateparksService {

    constructor(private _http: HttpClient, private zone: NgZone) {

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


    getFeatures(): Observable<IGetFeaturesResponse> {
        return this._http.post<IGetFeaturesResponse>(
            SITE_MAIN + 'integration/myskate/myskate-features.php',
            {},
        );
    }
}
