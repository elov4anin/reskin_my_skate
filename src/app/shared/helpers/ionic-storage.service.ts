import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {StorageEnum} from '../store/Storage.enum';

@Injectable({
  providedIn: 'root'
})
export class IonicStorageService {

  constructor(
      private _storage: Storage,
  ) {
  }

  async  setItem(key: string, value: any) {
    await this._storage.set(key, value);
  }

  async getItem(key: string): Promise<any> {
    return await this._storage.get(key);
  }

  async removeItem(key: string): Promise<any> {
    return await this._storage.remove(key);
  }
  // async isAuthenticated(): Promise<boolean> {
  //     return !!await this.getToken;
  // }

  async logout() {
    await this._storage.remove(StorageEnum.LOGGEDIN); //@todo
    await this._storage.remove(StorageEnum.PROFILE);
    await this._storage.remove(StorageEnum.GAME);
  }
}
