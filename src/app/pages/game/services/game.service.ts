import {ApiCreatorService} from '../../../shared/services/api-creator.service';
import {Observable} from 'rxjs';
import {IGetTrickListResponse} from '../interfaces/game.interfaces';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private _api: ApiCreatorService) {
    }


    getTrickList(difficulty: number): Observable<IGetTrickListResponse> {
        return this._api.basePostRequest<IGetTrickListResponse>(
            'integration/myskate/myskate-tricks-list.php',
            { difficulty },
        );
    }


    loadLeaderBoard(winnerId: string, page: number): Observable<IGetTrickListResponse> {
        return this._api.basePostRequest<IGetTrickListResponse>(
            'integration/myskate/myskate-leaderboard.php',
            { winner: winnerId, page },
        );
    }

    addResults(winner: string[]): Observable<IGetTrickListResponse> {
        return this._api.basePostRequest<IGetTrickListResponse>(
            'integration/myskate/myskate-leaderboard-add.php',
            { winner},
        );
    }


}
