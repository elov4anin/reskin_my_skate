import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAddFeedParams, IAddRatingParams, IGetFeedbackListByParkIdResponse} from '../interfaces/feedback.interfaces';
import {ApiCreatorService} from './api-creator.service';
import {IServerResponse} from '../interfaces/common';

@Injectable({
    providedIn: 'root'
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

    addFeed(params: IAddFeedParams): Observable<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-feed-save.php',
            params,
        );
    }

    addRating(params: IAddRatingParams): Observable<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'integration/myskate/myskate-rating-save.php',
            params,
        );
    }
}
