import {ApiCreatorService} from '../../../shared/services/api-creator.service';
import {Observable} from 'rxjs';
import {IAddToLeaderboardResponse, IGetTrickListResponse, ILoadLeaderboardResponse} from '../interfaces/game.interfaces';
import {Injectable} from '@angular/core';
import {IPlayer} from '../interfaces/player.interface';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private _api: ApiCreatorService) {
    }


    getTrickList(difficulty: number, trick_types: string[]): Observable<IGetTrickListResponse> {
        return this._api.basePostRequest<IGetTrickListResponse>(
            'integration/myskate/myskate-tricks-list-filtered.php',
            { difficulty, trick_types },
        );
    }


    loadLeaderBoard(winnerId: string, page: number): Observable<ILoadLeaderboardResponse> {
        return this._api.basePostRequest<ILoadLeaderboardResponse>(
            'integration/myskate/myskate-leaderboard.php',
            { winner: winnerId, page },
        );
    }

    addResults(winners: IPlayer[]): Observable<IAddToLeaderboardResponse> {
        return this._api.basePostRequest<IAddToLeaderboardResponse>(
            'integration/myskate/myskate-leaderboard-add.php',
            { winners},
        );
    }


}
