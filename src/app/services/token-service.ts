import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { SpotifyAuthResponse } from '../common/spotify-auth';
@Injectable()
export class TokenService {

  private token: string= '';
  private token$ = new BehaviorSubject(this.token);

  public get oAuthToken(): string {
    var usertoken = localStorage.getItem('id_token');
    return usertoken;
  }

  public clearToken(): void {
    this.token = '';
    this.token$.next(this.token);
  }

  public get authHeader(): {[name: string]: string} {
   // return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    return localStorage.getItem('id_token') ? { Authorization: `Bearer ${localStorage.getItem('id_token')}` } : {};

  }

  public get authTokens(): Observable<string> {
    return this.token$.asObservable();
  }

  public setAuthToken(spotifyResponse: SpotifyAuthResponse): boolean {
    console.log(spotifyResponse.access_token);
    if (!!spotifyResponse && !!spotifyResponse.access_token) {
      this.token = spotifyResponse.access_token;
      this.setSession(spotifyResponse);
    } else {
      this.token = '';
    }
    this.token$.next(this.token);
    return !!this.token;
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

}
