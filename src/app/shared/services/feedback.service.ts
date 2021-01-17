import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SITE_MAIN} from "../configs/main.config";
import {IGetFeedbackListByParkIdResponse} from "../interfaces/feedback.interfaces";

@Injectable({
    providedIn: "root"
})
export class FeedbackService {
    constructor(private _http: HttpClient) {

    }

    getFeedbackListByParkId(parkId: string, page: number = 0): Observable<IGetFeedbackListByParkIdResponse> {
        return this._http.post<IGetFeedbackListByParkIdResponse>(
            SITE_MAIN + 'integration/myskate/myskate-feed.php',
            {park: parkId, page},

        );
    }
}
