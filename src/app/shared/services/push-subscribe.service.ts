import {ApiCreatorService} from './api-creator.service';
import {IServerResponse} from '../interfaces/common';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PushSubscribeService {
    constructor(private _api: ApiCreatorService) {
    }

    subscribeDevice(userId: string, pushtoken: string): Promise<IServerResponse> {
        return this._api.basePostRequest<IServerResponse>(
            'save-user-pushtoken.php',
            {userId, pushtoken},
        ).toPromise();
    }
}
