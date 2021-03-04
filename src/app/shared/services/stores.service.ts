import {ApiCreatorService} from './api-creator.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IGetDetailStoreByIdResponse, IGetStoresParams, IGetStoresResponse} from '../interfaces/store.interfaces';

@Injectable({
    providedIn: 'root'
})
export class StoresService {
    constructor(private _api: ApiCreatorService) {
    }

    getStores(params: IGetStoresParams): Observable<IGetStoresResponse> {
        return this._api.basePostRequest<IGetStoresResponse>(
            'integration/myskate/myskate-stores-limited.php',
            params,
        );
    }

    getDetailStoreById(store_id: string): Observable<IGetDetailStoreByIdResponse> {
        return this._api.basePostRequest<IGetDetailStoreByIdResponse>(
            'integration/myskate/myskate-store-single.php',
            {store_id},
        );
    }
}
