import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot({
            mode: 'ios'
        }),
        IonicStorageModule.forRoot({
            name: '__skate',
            driverOrder: ['sqlite', 'indexeddb', 'websql']
        }),
        AppRoutingModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        NativeGeocoder,
        InAppBrowser,
        Camera,
        FileTransfer,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
