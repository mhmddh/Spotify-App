import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token-service';
import { Router } from '@angular/router';
import * as config from '../../../../config.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private tokenSvc: TokenService) { }

  ngOnInit() {
    if (!!this.tokenSvc.oAuthToken) {
      this.router.navigate(['artist']);
    }
  }

  login() {
    window.location.href = 'https://accounts.spotify.com/en/authorize/' +
      '?response_type=code&client_id=' + config.clientId +
      '&scope=' + encodeURIComponent('user-read-private user-read-email') +
      '&redirect_uri=' + encodeURIComponent(location.origin + '/' + config.redirectUri) + '';
  }
}
