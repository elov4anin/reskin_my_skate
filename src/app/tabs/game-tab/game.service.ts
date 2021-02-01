import {ApiCreatorService} from '../../shared/services/api-creator.service';
import {Observable} from 'rxjs';
import {IGetTrickListResponse} from './interfaces/game.interfaces';

export class GameService {
    constructor(private _api: ApiCreatorService) {
    }


    getTrickList(difficulty: number): Observable<IGetTrickListResponse> {
        return this._api.basePostRequest<IGetTrickListResponse>(
            'integration/myskate/myskate-tricks-list.php',
            { difficulty },
        );
    }
}
