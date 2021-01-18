import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {
    IGetFeaturesResponse, IGetParksByLocation,
    ISearchLocationsResponse,
    ISkateparkFilterParams, IUserLastCheckInResponse
} from "../interfaces/skatepark.interfaces";
import {ApiCreatorService} from "./api-creator.service";


@Injectable({
    providedIn: "root"
})
export class SkateparksService {

    constructor(private _api: ApiCreatorService) {

    }

    searchLocations(exp: string): Observable<ISearchLocationsResponse> {
        return this._api.basePostRequest<ISearchLocationsResponse>(
            'integration/myskate/myskate-parks-search-location.php',
            {filter: exp},
        );
    }

    getParksByLocation(filter: ISkateparkFilterParams): Observable<IGetParksByLocation> {
        filter.page = 0;
        return this._api.basePostRequest<IGetParksByLocation>(
            'integration/myskate-parks-radius-search.php',
            filter
        );
    }

    userLastCheckIn(parkId: string, userId: string): Observable<IUserLastCheckInResponse> {
        return this._api.basePostRequest<IUserLastCheckInResponse>(
            'integration/myskate/myskate-park-user-last-check-in.php',
            {
                park: parkId,
                user: userId
            }
        );
    }

    getFeatures(): Observable<IGetFeaturesResponse> {
        return this._api.basePostRequest<IGetFeaturesResponse>(
            'integration/myskate/myskate-features.php',
            {},
        );
    }
}
