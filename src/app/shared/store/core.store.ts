import {Store} from './abstract.store';
import {CoreState} from './core.state';
import {StorageEnum} from '../enums/Storage.enum';
import {Injectable} from '@angular/core';
import {IonicStorageService} from "../helpers/ionic-storage.service";


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

    private initObsValue(prop: keyof CoreState): Promise<any> {
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
    }

}
