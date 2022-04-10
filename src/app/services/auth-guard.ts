import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { TokenService } from './token-service';
import { SpotifyService } from './spofity-service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { SpotifyAuthRequest, SpotifyAuthResponse } from '../common/spotify-auth';
// import { Observable } from 'rxjs/';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  responsecode: string;
  constructor(private tokenSvc: TokenService, private spotifyServivce: SpotifyService, private authService: AuthService) { }

  public canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivateChild(next, state);
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    this.responsecode = next.queryParams.code;
    const ac: SpotifyAuthRequest = {
      code: this.responsecode,
      redirect_uri: location.origin + '/authorized',
      grant_type: 'client_credentials',
    };

    return this.authService.getToken(ac)
      .map((data: SpotifyAuthResponse) => {
        this.tokenSvc.setAuthToken(data);
        return true;
      }).catch(error => {
        return Observable.of(false);
      });
  }

}
