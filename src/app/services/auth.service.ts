import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenService } from './token-service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import { SpotifyAuthRequest, SpotifyAuthResponse } from '../common/spotify-auth';
import * as config from '../../../config.json';

@Injectable()
export class AuthService {
  public s = new SpotifyAuthResponse();
  constructor(private _http: Http, private tokenSvc: TokenService) {
  }

  getToken(data: SpotifyAuthRequest) {
    let httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let credentials = 'code=' + data.code + '&grant_type=authorization_code' + '&redirect_uri=' + data.redirect_uri + '&client_id='
      + config['clientId'] + '&client_secret=' + config['clientSecret'];

    return this._http.post('https://accounts.spotify.com/api/token', credentials, httpOptions)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public isLoggedIn() {
    if (localStorage.getItem('id_token')) {
      if (!moment().isBefore(this.getExpiration())) {
        this.logout();
      }
      return moment().isBefore(this.getExpiration());
    }
    return false;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private handleError(error: Response) {
    return Observable.throw(error || "Server Error");
  }

}
