import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CoreStore} from "../store/core.store";
import {AuthRoutesEnum} from "../../pages/auth/auth-routes.enum";
import {IonicStorageService} from "../helpers/ionic-storage.service";
import {StorageEnum} from "../enums/Storage.enum";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private _coreStore: CoreStore, private router: Router, private _storage: IonicStorageService) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const loggedIn = await this._coreStore.getValue(StorageEnum.LOGGEDIN)
        if (loggedIn) {
            return true;
        } else {
            await this.router.navigate(['/', AuthRoutesEnum.ROOT], {
                queryParams: {
                    accessDenied: true
                }
            });
            return false;
        }
    }

    async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return await this.canActivate(route, state);
    }

    async canLoad(route: Route) {
        const loggedIn = await this._coreStore.getValue(StorageEnum.LOGGEDIN)
        if (loggedIn) {
            return true;
        } else {
            await this.router.navigate(['/', AuthRoutesEnum.ROOT], {
                queryParams: {
                    accessDenied: true
                }
            });
            return false;
        }
    }

}
