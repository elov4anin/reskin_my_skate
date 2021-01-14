import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";

@Component({
    selector: 'app-reg',
    templateUrl: './reg.page.html',
    styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
    form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
    });

    constructor(private _router: Router) {
    }

    ngOnInit() {
    }

    register() {

    }

    async openLogin() {
        await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.LOGIN])
    }
}
