import {Observable, Subject, throwError as observableThrowError} from 'rxjs';
import {catchError, map, share, shareReplay} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
// import * as FileSaver from 'file-saver';
import {CoreStore} from '../store/core.store';
import {AuthRoutesEnum} from '../../pages/auth/auth-routes.enum';
import {SITE_MAIN} from '../configs/main.config';
import {ToastNotificationService} from '../helpers/toast-notification.service';

export type MapCallbackInterface<T1, T2> = (d: T1) => T2;

@Injectable({
    providedIn: 'root'
})
export class ApiCreatorService implements OnDestroy  {
    static readonly _fullApiUrl = SITE_MAIN;

    private componentDestroyed: Subject<any> = new Subject();

    constructor(private _http: HttpClient,
                private _router: Router,
                private _coreStore: CoreStore,
                private _toast: ToastNotificationService,
    ) {
    }


    /**
     * POST HTTP
     * @param {string} url
     * @param {any} body
     * @param {MapCallbackInterface<IOut1, IOut2>} mapCallback  - not required
     * @returns {Observable<any>}
     */
    basePostRequest<IOut1, IOut2 = IOut1>(url: string,
                                          body = {} as any,
                                          mapCallback: MapCallbackInterface<IOut1, IOut2> = d => (d as any as IOut2)) {
        const currUrl = ApiCreatorService._fullApiUrl + url;
        return this._http
            .post<IOut1>(currUrl, body, {
                headers: this._getHeader(),
            })
            .pipe(
                catchError(err => {
                    return this._catchError(err, url);
                }),
                map(mapCallback),
                share()
            );

    }


    /** HTTP POST WITH PROGRESS
     * @param {string} url
     * @param {any} body
     * @param {MapCallbackInterface<IOut1, IOut2>}  mapCallback  - not required
     * @returns {Observable<any>}
     */
    basePostRequestWithProgress<IOut1, IOut2 = IOut1>(url: string,
                                                      body = {} as any) {
        const currUrl = ApiCreatorService._fullApiUrl + url;
        return this._http
            .post<IOut1>(currUrl, body, {
                headers: this._getHeader(),
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                catchError(err => {
                    return this._catchError(err, url);
                }),
                share()
            );
    }

    /**
     * HTTP GET
     * @param {string} url
     * @param {MapCallbackInterface<IOut1, IOut2>}  mapCallback  - not required
     * @returns {Observable<any>}
     */
    baseGetRequest<IOut1, IOut2 = IOut1>(url: string, mapCallback: MapCallbackInterface<IOut1, IOut2> = d => (d as any as IOut2)) {

        const currUrl = ApiCreatorService._fullApiUrl + url;
        return this._http
            .get<IOut1>(currUrl, {
                headers: this._getHeader()
            })
            .pipe(
                catchError(err => {
                    return this._catchError(err, url);
                }),
                map(mapCallback),
                shareReplay({refCount: true, bufferSize: 1})
            );
    }

    /**
     * HTTP DELETE
     * @param {string} url
     * @param {MapCallbackInterface<IOut1, IOut2>} mapCallback  - not required
     * @returns {Observable<any>}
     */
    baseDeleteRequest<IOut1, IOut2 = IOut1>(url: string, mapCallback: MapCallbackInterface<IOut1, IOut2> = d => (d as any as IOut2)) {
        const currUrl = ApiCreatorService._fullApiUrl + url;
        return this._http
            .delete<IOut1>(currUrl, {
                headers: this._getHeader()
            })
            .pipe(
                catchError(err => {
                    return this._catchError(err, url);
                }),
                map(mapCallback),
                share()
            ).toPromise();
    }

    private _getHeader() {
        return new HttpHeaders(
            {
                Accept: '*/*',
                'Content-Type': 'application/json',
            }
        );
    }



    private showNotifyAndReturnError(title, msg, err, url) {
        this._toast.error(msg).then();
        return observableThrowError(err);
    }

    private _catchError(err: HttpErrorResponse, url: string) {
        const errTitle = 'Unknown error';
        const errMsg = 'Something is broken';
        const {title = errTitle, msg = errMsg} = (err.error || {});

        switch (err.status) {
            case 0: {
                if  (err.statusText === 'Unknown Error') {
                    return this.showNotifyAndReturnError(errTitle, errMsg, err, url);
                }
                // нет инета;
                // this._coreStore.setValue(StorageEnum.CONNECTED , NetworkStatusEnum.OFFLINE);
                // break;
                return observableThrowError(err);
            }
            case 200: {
                return this.showNotifyAndReturnError(errTitle, err.message, err, url);
            }
            case 401: {
                // если пользователь не авторизован
                this.signOutAndRedirectToSignInPage().then();
                return this.showNotifyAndReturnError('Authorization Error', err.error.message ? err.error.message : err.message, err, url);
                // return observableThrowError('403 Недоступно неавторизованным пользователям: ' + url);
            }
            case 403:

            case 422 : {
                return this.showNotifyAndReturnError('Error', err.error.message ? err.error.message : err.message, err, url);
            }
            case 500: {
                return this.showNotifyAndReturnError(title, msg, err, url);
            }
            case 510 : {
                return this.showNotifyAndReturnError('Synchronization error', err.error ? err.error.message + '' : '', err, url);
            }
            default : {
                return observableThrowError(err);
            }
        }
    }

    private async signOutAndRedirectToSignInPage(): Promise<void> {
        await this._coreStore.clearLogout();
        await this._router.navigate(['/', AuthRoutesEnum.ROOT], {replaceUrl: true});
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

}
