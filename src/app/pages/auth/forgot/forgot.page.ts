import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
    });

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    async openLogin() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN])
    }

    reset() {

    }
}
