import {ApiCreatorService, MapCallbackInterface} from '../../../shared/services/api-creator.service';
import {Observable} from 'rxjs';
import {IPlayer, IPlayerSearchResponse} from '../interfaces/player.interface';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    constructor(private _api: ApiCreatorService) {
    }

    playerSearch(search): Observable<IPlayer[]> {

        // tslint:disable-next-line:no-shadowed-variable
        const mapCallback: MapCallbackInterface<IPlayerSearchResponse, IPlayer[]> = (res) => res.players;
        return this._api.basePostRequest<IPlayerSearchResponse, IPlayer[]>(
            'integration/myskate/myskate-players-match.php',
            {search},
            mapCallback
        );
    }
}
