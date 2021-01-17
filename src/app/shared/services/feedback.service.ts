import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IGetFeedbackListByParkIdResponse} from "../interfaces/feedback.interfaces";
import {ApiCreatorService} from "./api-creator.service";

@Injectable({
    providedIn: "root"
})
export class FeedbackService {
    constructor(private _api: ApiCreatorService) {

    }

    getFeedbackListByParkId(parkId: string, page: number = 0): Observable<IGetFeedbackListByParkIdResponse> {
        return this._api.basePostRequest<IGetFeedbackListByParkIdResponse>(
            'integration/myskate/myskate-feed.php',
            {park: parkId, page},
        );
    }
}
