import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SITE_MAIN} from "../../shared/configs/main.config";

// import md5 from 'crypto-js/md5';
// import sha1 from 'crypto-js/sha1';
import {Observable} from "rxjs";
import {ILoginResponse} from "../../shared/interfaces/auth.interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(params: {email: string, password: string}): Observable<ILoginResponse> {
   // const hash = md5(params.password).toString();
   // const salt = sha1(hash).toString();
    return this._http.post<ILoginResponse>(
        SITE_MAIN + 'integration/sport80-login.php' ,
        {email: params.email, hash: params.password},
        {
          headers: this._getHeader(),
        }
        );
  }

  forgot(params: {email: string}) {
      return this._http.post<ILoginResponse>(
          SITE_MAIN + 'integration/sport80-reset-pass.php' ,
          {email: params.email},
          {
              headers: this._getHeader(),
          }
      );
  }

  private _getHeader() {
    return new HttpHeaders(
        {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        }
    );
  }
}
