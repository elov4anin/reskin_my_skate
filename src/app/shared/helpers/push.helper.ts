import {Injectable} from '@angular/core';
import {OneSignal, OSNotificationOpenedResult} from '@ionic-native/onesignal/ngx';
import {CoreStore} from '../store/core.store';
import {IUser} from '../interfaces/auth.interfaces';
import {DOMAIN} from '../configs/main.config';
import {PushSubscribeService} from '../services/push-subscribe.service';
import {PushTypesEnum} from '../enums/push-types.enum';
import {ToastNotificationService} from './toast-notification.service';
import {Vibration} from '@ionic-native/vibration/ngx';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../tabs/tabs.enum';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PushHelper {
    private readonly APP_ID: string = '5ef20128-3b7b-46f7-a133-143c51550c3c';

    constructor(
        private _oneSignal: OneSignal,
        private _coreStore: CoreStore,
        private _pushSubscribeService: PushSubscribeService,
        private _toast: ToastNotificationService,
        private _vibration: Vibration,
        private _router: Router,
    ) {
    }

    async init() {
        this._oneSignal.startInit(this.APP_ID);
        this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.InAppAlert);
        this._oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when notification is received
        });

        this._oneSignal.handleNotificationOpened().subscribe((res) => this.notificationOpenedCallback(res));
        const user: IUser = this._coreStore.state.profile;
        this._oneSignal.sendTags({
            fitnexus_user_id: user.id,
            email: user.email,
            club_id: DOMAIN,
            fullname: user.fullname,
            user_type: user.user_type
        });
        this._oneSignal.syncHashedEmail(user.email);
        const ids: {
            userId: string;
            pushToken: string;
        } = await this._oneSignal.getIds();
        try {
            await this._pushSubscribeService.subscribeDevice(user.id, ids.userId);
            this._oneSignal.setLogLevel({ logLevel: 0, visualLevel: 0 });
            this._oneSignal.endInit();
        } catch (e) {
            console.log('Error subscribeDevice', e);
        }
    }


    notificationOpenedCallback(jsonData: OSNotificationOpenedResult) {
        const payloadCallback = jsonData.notification.payload.additionalData.page;
        const payloadMessage = jsonData.notification.payload.additionalData.message;
        const foreground = jsonData.notification.isAppInFocus;
        // check payload type
        switch (payloadCallback) {
            case PushTypesEnum.game:
                this.showMessage(
                    foreground,
                    payloadMessage,
                    ['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME]
                );
                break;
            case PushTypesEnum.finder:
                this.showMessage(
                    foreground,
                    payloadMessage,
                    ['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS]
                );
                break;
            case PushTypesEnum.extras:
                this.showMessage(
                    foreground,
                    payloadMessage,
                    ['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.TEAM]
                );
                break;
            default:
                this.showMessage(
                    foreground,
                    payloadMessage,
                    ['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS]
                );
                break;
        }
    }

    private showMessage(foreground: boolean, payloadMessage: string, route: string[]) {
        if (foreground === true) {
            // foreground show toast
            this._toast.info(payloadMessage).then();
            this._vibration.vibrate(1000);
        } else {
            // in background
            this._router.navigate(route).then();
        }
    }
}
