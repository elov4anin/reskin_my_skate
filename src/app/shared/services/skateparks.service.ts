import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    IAddSkateparkParams, IAddSkateParkResponse, IGetFavouriteParksResponse,
    IGetFeaturesResponse, IGetParksByLocation,
    ISearchLocationsResponse,
    ISkateparkFilterParams, IUserLastCheckInResponse
} from '../interfaces/skatepark.interfaces';
import {ApiCreatorService} from './api-creator.service';
import {map} from 'rxjs/operators';
import {IServerResponse} from '../interfaces/common';


@Injectable({
    providedIn: 'root'
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

    getParksByLocation(filter: ISkateparkFilterParams, user_id: string): Observable<IGetParksByLocation> {
        return this._api.basePostRequest<IGetParksByLocation>(
            'integration/myskate-parks-radius-search.php',
            {
                ...filter,
                user_id
            }
        ).pipe(
            map(res => {
                return {
                    ...res,
                    parks: res.parks.map((s) => {
                        return {
                            ...s,
                            _isNew: this.checkSkatePark(s.modified_at)
                        };
                    })
                };
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

    private checkSkatePark(modifiedAt: string): boolean {
        // const date = dayjs(modifiedAt).format()
        return false;
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


    reportParkClosure(parkId: string, userId: string, description: string) {
        return this._api.basePostRequest<IAddSkateParkResponse>(
            'integration/myskate/myskate-park-report-closure.php',
            {
                user: userId,
                park: parkId,
                description
            },
        );
    }

    getFavouriteParks(userId: string, page: number = 0, limit: number = 10): Observable<IGetFavouriteParksResponse> {
        return this._api.basePostRequest<IGetFavouriteParksResponse>(
            'integration/myskate/myskate-park-favourites.php',
            {
                user_id: userId,
                page,
                limit
            },
        );
    }

    getMostPopularParks(userId: string, page: number = 0, limit: number = 10): Observable<IGetFavouriteParksResponse> {
        return this._api.basePostRequest<IGetFavouriteParksResponse>(
            'integration/myskate/myskate-most-popular-parks.php',
            {
                user_id: userId,
                page,
                limit
            },
        );
    }

    saveParkFavourite(userId: string, parkId: string): Promise<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-save-park-favourite.php',
            {
                user_id: userId,
                park_id: parkId
            },
        ).toPromise();
    }

    deleteParkFavourite(userId: string, parkId: string): Promise<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-delete-park-favourite.php',
            {
                user_id: userId,
                park_id: parkId
            },
        ).toPromise();
    }
}
