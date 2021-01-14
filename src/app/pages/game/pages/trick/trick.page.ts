import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalTrickHowtoComponent} from "./modal-trick-howto/modal-trick-howto.component";
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../../../../tabs/tabs.enum";
import {GameRoutes} from "../../game-routes";

@Component({
    selector: 'app-trick',
    templateUrl: './trick.page.html',
    styleUrls: ['./trick.page.scss'],
})
export class TrickPage implements OnInit {

    constructor(private _modalController: ModalController, private _router: Router) {
    }

    ngOnInit() {
    }

    async openModalPlayTrick() {
        const modal = await this._modalController.create({
            component: ModalTrickHowtoComponent,
            cssClass: 'modal-add-players',
        });
        await modal.present();
    }

    async stopGame() {
        await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.GAME])
    }

    async openNailed() {
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.NAILED])
    }

    async openFailed() {
        await this._router.navigate(['/', GameRoutes.ROOT, GameRoutes.FAILED])
    }
}