import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "../auth-routes.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logIn() {

  }

  async openRegistration() {
    await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.REG]);
  }

  async openForgot($event) {
    await this._router.navigate(['/', AuthRoutesEnum.ROOT, AuthRoutesEnum.FORGOT_PASS]);
  }
}
