import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token-service';
import { sharedVariable } from 'src/app/common/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  private tokenSvc: TokenService) { }

  ngOnInit() {
    if ( !!this.tokenSvc.oAuthToken) {
      this.router.navigate(['artist']);
    }
  }

  login() {
    window.location.href = 'https://accounts.spotify.com/authorize' +
        '?response_type=code&client_id=' + sharedVariable.clientId +
        '&scope=' + encodeURIComponent('user-read-private user-read-email')  +
        '&redirect_uri=' + encodeURIComponent(sharedVariable.baseUrl + '/' + sharedVariable.redirectUri) + '';
  }
}
