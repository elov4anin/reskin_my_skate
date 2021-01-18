import {ApiCreatorService} from "./api-creator.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IGetEventListResponse, IGetFeedListResponse} from "../interfaces/team.interfaces";


@Injectable({
    providedIn: "root"
})
export class TeamService {
    constructor(private _api: ApiCreatorService) {
    }

    getFeedList(page:number = 0): Observable<IGetFeedListResponse> {
        return this._api.basePostRequest<IGetFeedListResponse>(
            'integration/myskate/myskate-feed-teamGB.php',
            {page},
        );
    }

    getLatestNews(): Observable<IGetFeedListResponse> {
        return this._api.basePostRequest<IGetFeedListResponse>(
            'integration/myskate/myskate-feed-teamGB-latest.php',
            {},
        );
    }

    getEventList(page:number = 0): Observable<IGetEventListResponse> {
        return this._api.basePostRequest<IGetEventListResponse>(
            'integration/myskate/myskate-events.php',
            {page},
        );
    }

    getLatestEvents(): Observable<IGetEventListResponse> {
        return this._api.basePostRequest<IGetEventListResponse>(
            'integration/myskate/myskate-events-latest.php',
            {},
        );
    }
}
