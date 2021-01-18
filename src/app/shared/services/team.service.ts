import {ApiCreatorService} from "./api-creator.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IGetFeedListResponse} from "../interfaces/team.interfaces";


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

    getLatestNews(page:number = 0): Observable<IGetFeedListResponse> {
        return this._api.basePostRequest<IGetFeedListResponse>(
            'integration/myskate/myskate-feed-teamGB-latest.php',
            {page},
        );
    }
}
