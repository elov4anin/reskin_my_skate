import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {
    IAddSkateparkParams, IAddSkateParkResponse,
    IGetFeaturesResponse, IGetParksByLocation,
    ISearchLocationsResponse,
    ISkateparkFilterParams, IUserLastCheckInResponse
} from "../interfaces/skatepark.interfaces";
import {ApiCreatorService} from "./api-creator.service";
import {map} from "rxjs/operators";
import * as dayjs from "dayjs";
import {IServerResponse} from "../interfaces/common";


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
        ).pipe(
            map(res => {
                return {
                    ...res,
                    parks: res.parks.map((s) => {
                        return {
                            ...s,
                            _isNew: this.checkSkatePark(s.modified_at)
                        }
                    })
                }
            })
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

    private checkSkatePark(modified_at: string): boolean {
        // const date = dayjs(modified_at).format()
        return true;
    }

    addSkatepark(params: IAddSkateparkParams): Observable<IAddSkateParkResponse> {
        return this._api.basePostRequest<IAddSkateParkResponse>(
            'integration/myskate/myskate-park-save.php',
            params,
        );
    }

    addSkateparkWithImage(params: IAddSkateparkParams): Observable<IAddSkateParkResponse> {
        return this._api.basePostRequest<IAddSkateParkResponse>(
            'integration/myskate/myskate-park-save-image.php',
            params,
        );
    }
}
