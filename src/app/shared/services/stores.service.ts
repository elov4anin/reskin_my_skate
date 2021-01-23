import {ApiCreatorService} from "./api-creator.service";
import {Injectable} from "@angular/core";
import {ISearchLocationsResponse} from "../interfaces/skatepark.interfaces";
import {Observable} from "rxjs";
import {IGetStoresParams, IGetStoresResponse} from "../interfaces/store.interfaces";

@Injectable({
    providedIn: "root"
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
}
