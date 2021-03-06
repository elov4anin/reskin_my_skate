import {Store} from './abstract.store';
import {CoreState} from './core.state';
import {StorageEnum} from './Storage.enum';
import {Injectable} from '@angular/core';
import {IonicStorageService} from '../helpers/ionic-storage.service';


@Injectable({
    providedIn: 'root'
})
export class CoreStore extends Store<CoreState> {
    private readonly _prefix: string;
    public ready$: Promise<any[]>;

    constructor(private _storage: IonicStorageService) {
        super(new CoreState());
        this._prefix = 'lk';

        // read initial values from storage
        this.ready$ = Promise.all([
            this.initValue(StorageEnum.LOGGEDIN),
            this.initValue(StorageEnum.PROFILE),
            this.initValue(StorageEnum.GAME),
            this.initValue(StorageEnum.SELECTED_SKATEPARK),
            this.initValue(StorageEnum.SKATEPARK_FEATURES),
            this.initValue(StorageEnum.SELECTED_NEWS),
            this.initValue(StorageEnum.SELECTED_EVENT),
            this.initValue(StorageEnum.PLAYERS),
            this.initValue(StorageEnum.PLAYERS_IN_GAME),
            this.initValue(StorageEnum.TRICKS),
            this.initValue(StorageEnum.ORIGINAL_TRICKS),
            this.initValue(StorageEnum.SELECTED_DIFFICULTY),
            this.initValue(StorageEnum.CURRENT_TRICK),
            this.initValue(StorageEnum.GAME_PLAYERS),
            this.initValue(StorageEnum.SELECTED_TRICK_TYPES),
        ]);
    }


    private initValue(prop: keyof CoreState): Promise<any> {
        return this._storage.getItem(prop).then(value => {
            this.setStateValue(prop, value);
            return value;
        }).catch(_ => {
            this.setStateValue(prop, undefined);
            return undefined;
        });
    }

    private setStateValue(prop: keyof CoreState, value: any): void {
        this.state = {
            ...this.state,
            [prop]: value
        };
    }

    setValue(prop: keyof CoreState, value: any): Promise<any> {
        this.setStateValue(prop, value);
        return this._storage.setItem(prop, value);
    }

    setCacheValue(prop: keyof CoreState, value: any): Promise<any> {
        value = JSON.stringify(value);
        this.setStateValue(prop, value);
        return this._storage.setItem(prop, value);
    }

    getValue(prop: keyof CoreState): Promise<any> {
        return this._storage.getItem(prop);
    }

    removeValue(prop: keyof CoreState): Promise<any> {
        this.setStateValue(prop, undefined);
        return this._storage.removeItem(prop);
    }

    async clearLogout() {
        await this.removeValue(StorageEnum.LOGGEDIN);
        await this.removeValue(StorageEnum.GAME);
        await this.removeValue(StorageEnum.PROFILE);
        await this.removeValue(StorageEnum.SELECTED_SKATEPARK);
        await this.removeValue(StorageEnum.SKATEPARK_FEATURES);
    }

}
